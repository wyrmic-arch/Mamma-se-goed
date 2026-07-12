import { NextResponse } from 'next/server';
import { getContent, saveContent } from '@/lib/data';

function checkAuth(request) {
  const token = request.cookies.get('admin_token')?.value;
  return token === 'authenticated';
}

export async function GET(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const content = getContent();
  return NextResponse.json(content);
}

export async function PUT(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const data = await request.json();
    saveContent(data);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
