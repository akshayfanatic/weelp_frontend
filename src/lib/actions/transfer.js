"use server";

import { revalidatePath } from "next/cache";
import { authApi } from "../axiosInstance";
import { delay, log } from "../utils";

/**
 * Action for Create Transfer By Admin
 * @param {{ name: string, slug: string, description: string, transferType: string, vendor_id: number, route_id: number, pricing_tier_id: number, availability_id: number, media_gallery: { media_id: number, name: string, alt_text: string, url: string, created_at: string, updated_at: string }[] }} data - Transfer creation payload
 * @returns {{ success: boolean, message: string }} - API response status and message
 */
export const createTransferByAdmin = async (data = {}) => {
  try {
    await delay(500);
    const res = await authApi.post("/api/admin/transfers", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // revalidatePath("/dashboard/admin/transfers"); // revalidate api

    log(res);
    return {
      success: true,
      message: res.data?.message,
    };
  } catch (err) {
    log(err?.response);
    // const status = err?.response?.status;

    // if (status === 400) {
    //   return {
    //     success: false,
    //     message: "Validation error",
    //     errors: err?.response?.data?.errors,
    //   };
    // }

    // // if email alrady exist
    // if (status === 409) {
    //   return {
    //     success: false,
    //     message: err?.response?.data?.error || "Already Exist",
    //   };
    // }

    // if (status === 422) {
    //   return {
    //     success: false,
    //     message: "Vendor already exists",
    //   };
    // }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
