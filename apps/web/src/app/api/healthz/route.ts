import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      app: 'udance-web',
      version: process.env.npm_package_version || '0.1.0',
    },
    { status: 200 }
  );
}
