import { NextResponse } from 'next/server';

export async function POST(request) {
  const { password } = await request.json();
  if (password === 'mamma') {
    const res = NextResponse.json({ success: true });
    res.cookies.set('admin_token', 'authenticated', {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
    });
    return res;
  }
  return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
}
