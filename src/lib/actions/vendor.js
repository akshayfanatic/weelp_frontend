"use server";

import { revalidatePath } from "next/cache";
import { authApi } from "../axiosInstance";
import { delay, log } from "../utils";

/**
 * Action for Create Vendor
 * @param {{ name: string, description: string, email: string, phone: string, address:string, status:string }} data form data related to create vendor
 * @returns {void}
 */

export const createVendor = async (data = {}) => {
  try {
    await delay(500);
    const res = await authApi.post("/api/admin/vendors/store/vendor", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/dashboard/admin/transfers/vendors"); // revalidate api
    return {
      success: true,
      message: res.data?.message,
    };
  } catch (err) {
    const status = err?.response?.status;

    if (status === 400) {
      return {
        success: false,
        message: "Validation error",
        errors: err?.response?.data?.errors,
      };
    }

    // if email alrady exist
    if (status === 409) {
      return {
        success: false,
        message: err?.response?.data?.error || "Already Exist",
      };
    }

    if (status === 422) {
      return {
        success: false,
        message: "Vendor already exists",
      };
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

/**
 * Action for Creating a Vendor Route
 * @param {{ vendor_id: number,name: string,description: string,start_point: string,end_point: string,base_price: number,price_per_km: number,status: 'active' | 'inactive' | 'pending' }} data - Form data for creating a vendor route
 * @returns {void}
 */
export const createVendorRoute = async (data = {}) => {
  try {
    const { vendor_id } = data; // access id
    await delay(500);
    const res = await authApi.post("/api/admin/vendors/store/route", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath(`/dashboard/admin/transfers/${vendor_id}/vendors`); // revalidate api
    return {
      success: true,
      message: res.data?.message,
    };
  } catch (err) {
    const status = err?.response?.status;

    if (status === 400) {
      return {
        success: false,
        message: "Validation error",
        errors: err?.response?.data?.errors,
      };
    }

    // if email alrady exist
    if (status === 409) {
      return {
        success: false,
        message: err?.response?.data?.error || "Already Exist",
      };
    }

    if (status === 422) {
      return {
        success: false,
        message: "Vendor already exists",
      };
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

/**
 * Action for Creating a Vendor Pricing
 * @param {{vendor_id: number, name: string, description: string, base_price: number, price_per_km: number, min_distance: number, waiting_charge: number, night_charge_multiplier: number, peak_hour_multiplier: number, status: 'active' | 'inactive' | 'pending'}} data - Form data for creating a vendor pricing
 * @returns {{success,message}}
 */
export const createVendorPricing = async (data = {}) => {
  try {
    const { vendor_id } = data; // access id
    await delay(500);
    const res = await authApi.post("/api/admin/vendors/store/pricing-tier", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath(`/dashboard/admin/transfers/${vendor_id}/pricing`); // revalidate api
    return {
      success: true,
      message: res.data?.message,
    };
  } catch (err) {
    const status = err?.response?.status;

    if (status === 400) {
      return {
        success: false,
        message: "Validation error",
        errors: err?.response?.data?.errors,
      };
    }

    // if email alrady exist
    if (status === 409) {
      return {
        success: false,
        message: err?.response?.data?.error || "Already Exist",
      };
    }

    if (status === 422) {
      return {
        success: false,
        message: "Vendor already exists",
      };
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
