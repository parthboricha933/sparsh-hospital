import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret');
    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json({
      authenticated: true,
      admin: { name: payload.name, email: payload.email },
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
