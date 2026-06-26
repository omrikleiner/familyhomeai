import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Family Home AI POC is online.' });
}
