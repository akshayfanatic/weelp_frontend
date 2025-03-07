import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { token, password, password_confirmation } = await req.json();

    const response = await axios.post(
      process.env.NEXT_PUBLIC_USER_RESETPASS_API,
      { password, token, password_confirmation }
    );

    const { message } = response.data;

    return NextResponse.json(
      { message: message || "Password has been reset successfully." },
      { status: response.status }
    );
  } catch (error) {
    // Handle Error
    const {
      response: { data },
    } = error;

    const { message } = data;

    return NextResponse.json(
      { message: message || "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
