import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const { email } = await req.json();

    const response = await axios.post(
      process.env.NEXT_PUBLIC_USER_FORGOTPASS_API,
      {
        email,
      }
    );

    // handle request
    if (response.status === 200) {
      const { success, message } = response.data;

      return NextResponse.json(
        { message, success },
        { status: response.status }
      );
    }
  } catch (error) {
    if (error) {
      return NextResponse.json(
        { message: "An unexpected error occurred. Please try again ." },
        { status: 500 }
      );
    }
  }
}
