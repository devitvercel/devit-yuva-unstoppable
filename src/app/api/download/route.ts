import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const encodedUrl = searchParams.get('url');

  if (!encodedUrl) {
    return new NextResponse('Missing url parameter', { status: 400 });
  }

  try {
    const fileUrl = Buffer.from(encodedUrl, 'base64').toString('utf-8');
    const response = await fetch(fileUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Try to extract a filename from the URL, fallback to 'download.pdf'
    const urlParts = fileUrl.split('/');
    const filename = urlParts[urlParts.length - 1] || 'download.pdf';

    const headers: Record<string, string> = {
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': response.headers.get('content-type') || 'application/octet-stream',
      // Let the CDN serve repeat downloads without invoking this function.
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
    };
    // fetch() transparently decompresses, so a compressed upstream length would be wrong.
    const contentLength = response.headers.get('content-length');
    if (contentLength && !response.headers.get('content-encoding')) {
      headers['Content-Length'] = contentLength;
    }

    // Stream the body instead of buffering the whole file in memory.
    return new NextResponse(response.body, { headers });
  } catch (error) {
    console.error('Proxy download error:', error);
    // If the proxy fails, we can redirect the user to the file directly as a fallback
    return NextResponse.redirect(encodedUrl);
  }
}
