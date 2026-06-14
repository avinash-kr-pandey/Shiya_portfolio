import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  // Ensure the requested file is only from the assets folder to prevent directory traversal
  if (name.includes('/') || name.includes('\\') || name.includes('..')) {
    return new NextResponse('Invalid file request', { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'src', 'assets', name);
  
  try {
    const file = fs.readFileSync(filePath);
    
    // Determine content type based on extension
    const ext = name.split('.').pop()?.toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === 'pdf') contentType = 'application/pdf';
    else if (ext === 'png') contentType = 'image/png';
    else if (ext === 'jpg' || ext === 'jpeg') contentType = 'image/jpeg';
    
    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${name}"`,
      },
    });
  } catch (error) {
    return new NextResponse('File not found', { status: 404 });
  }
}
