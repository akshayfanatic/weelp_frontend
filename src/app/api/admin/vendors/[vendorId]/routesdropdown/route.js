// app/api/admin/vendors/[id]/routesdropdown/route.js
import { NextResponse } from 'next/server';
import { getRoutesByVendorIdOptions } from '@/lib/queries/vendors'; // get vehicles by vendor id

export async function GET(req, { params }) {
  const { vendorId } = await params;

  const data = await getRoutesByVendorIdOptions(vendorId);

  return NextResponse.json({ ...data });
}
