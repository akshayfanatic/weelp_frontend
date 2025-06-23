// app/api/customer/orders/route.js  handles customer orders
import { NextResponse } from "next/server";
import { delay, log } from "@/lib/utils";
import { getAllUsersOrdersAdmin } from "@/lib/services/orders";

// get all orders
export async function GET(req) {
  const query = req.nextUrl.search;
  await delay(500);
  const data = ({} = await getAllUsersOrdersAdmin(query));

  return NextResponse.json({ data });
}
