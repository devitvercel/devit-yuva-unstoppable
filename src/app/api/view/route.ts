import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const encodedUrl = searchParams.get('q');

  if (!encodedUrl) {
    return new NextResponse('Missing parameter', { status: 400 });
  }

  try {
    // Decode the base64 URL so the backend URL isn't exposed in plaintext
    const fileUrl = Buffer.from(encodedUrl, 'base64').toString('utf-8');
    const response = await fetch(fileUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const blob = await response.blob();
    const urlParts = fileUrl.split('/');
    const filename = urlParts[urlParts.length - 1] || 'document.pdf';

    return new NextResponse(blob, {
      headers: {
        // 'inline' tells the browser to display it instead of downloading
        'Content-Disposition': `inline; filename="${filename}"`,
        'Content-Type': response.headers.get('content-type') || 'application/pdf',
      },
    });
  } catch (error) {
    console.error('Proxy view error:', error);
    return new NextResponse('Error loading document', { status: 500 });
  }
}
