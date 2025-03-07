import { NextResponse } from "next/server";
import { fakeData } from "@/app/Data/ShopData";

export async function GET(request) {
    return NextResponse.json({ message: fakeData, status: 200 })
}