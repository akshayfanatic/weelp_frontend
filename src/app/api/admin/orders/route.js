// app/api/admin/orders/route.js
import { NextResponse } from 'next/server';
import { delay, log } from '@/lib/utils';
import { getAllOrdersAdmin } from '@/lib/queries/orders';

// get all orders
export async function GET(req) {
  const query = req.nextUrl.search;
  await delay(500);
  const data = ({} = await getAllOrdersAdmin(query));
  return NextResponse.json({ data });
}
