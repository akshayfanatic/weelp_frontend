// app/api/admin/users/route.js
import { NextResponse } from 'next/server';
import { delay } from '@/lib/utils';
import { getAllUsersAdmin } from '@/lib/queries/users';

export async function GET(req) {
  const query = req.nextUrl.search;
  await delay(500);
  const data = await getAllUsersAdmin(query);
  return NextResponse.json({ ...data });
}
