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

    const blob = await response.blob();
    // Try to extract a filename from the URL, fallback to 'download.pdf'
    const urlParts = fileUrl.split('/');
    const filename = urlParts[urlParts.length - 1] || 'download.pdf';

    return new NextResponse(blob, {
      headers: {
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Type': response.headers.get('content-type') || 'application/octet-stream',
      },
    });
  } catch (error) {
    console.error('Proxy download error:', error);
    // If the proxy fails, we can redirect the user to the file directly as a fallback
    return NextResponse.redirect(encodedUrl);
  }
}
