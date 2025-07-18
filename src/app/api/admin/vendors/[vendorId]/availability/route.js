// app/api/admin/vendors/[id]/availability/route.js

import { NextResponse } from "next/server";
import { delay, log } from "@/lib/utils";
import { getAvailabilityByVendorIdAdmin } from "@/lib/services/vendors"; // get vehicles by vendor id

export async function GET(req, { params }) {
  const { vendorId } = await params;

  const query = req.nextUrl.search;
  await delay(500);

  const data = await getAvailabilityByVendorIdAdmin(vendorId, query);

  return NextResponse.json({ data });
}
