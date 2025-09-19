// /api/payments/create-order

import { publicApi } from '@/lib/axiosInstance';
import { NextResponse } from 'next/server';
import { log } from '@/lib/utils';
import { checkoutCreateOrder } from '@/lib/actions/checkout';

export async function POST(req) {
  try {
    const orderData = await req.json(); // ✅ Directly get parsed JSON

    const profileResponse = await checkoutCreateOrder(orderData);

    
    return NextResponse.json({
      success: true,
      data: profileResponse,
    });
  } catch (error) {
    console.error('Edit Profile API Error:', error);

    return NextResponse.json({ success: false, error: 'Error updating profile' }, { status: 500 });
  }
}
