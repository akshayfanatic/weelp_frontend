// @ts-check
"use server";

import { revalidatePath } from "next/cache";
import { authApi } from "@/lib/axiosInstance";
import { delay, log } from "@/lib/utils";
import { ApiError } from "@/dto/Error";

/**
 * Action for Create a  review by Customer.
 * @param {ReviewFormCustomer} data - Review form data
 * @returns {Promise<{ success: boolean, message: string, errors?: any }>}
 */
export const createReviewByCustomer = async (data) => {
  try {
    const formData = new FormData();

    // Basic fields
    formData.append("item_type", data.item_type);
    formData.append("item_id", String(data.item_id));
    formData.append("rating", String(data.rating));
    formData.append("review_text", data.review_text);

    // Existing media IDs (send as array)
    if (Array.isArray(data?.existing_media_ids)) {
      data.existing_media_ids.forEach((i) => {
        formData.append("existing_media_ids[]", String(i));
      });
    }

    // New files
    if (Array.isArray(data.file)) {
      data.file.forEach((f) => {
        formData.append("file[]", f);
      });
    }
    // Optional: simulate network delay for better UX testing
    await delay(500);

    const response = await authApi.post("/api/customer/postreview", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Revalidate cached dashboard reviews page
    revalidatePath("/dashboard/customer");

    return {
      success: true,
      message: response.data?.message || "Review created successfully",
    };
  } catch (error) {
    const status = error?.response?.status;
    const serverData = error?.response?.data || {};

    // Handle specific known status codes
    switch (status) {
      case 400:
        return ApiError({
          message: "Validation error",
          status,
          errors: serverData.errors,
        });

      case 409:
        return ApiError({
          message: serverData.error || "Review already exists",
          status,
        });

      case 422:
        return ApiError({
          message: serverData.message || "Cannot process review",
          status,
        });

      default:
        return ApiError({
          message: "Something went wrong while creating the review",
          status: status || 500,
        });
    }
  }
};

/**
 * Action for Edit Review.
 * @param {ReviewFormCustomer} data - Review form data
 * @param {number|string} id -  Id of the Customer
 * @returns {Promise<{ success: boolean, message: string, errors?: any }>}
 */
export const editReviewByCustomer = async (data, id) => {
  try {
    const formData = new FormData();

    // Basic fields
    formData.append("item_type", data.item_type);
    formData.append("item_id", String(data.item_id));
    formData.append("rating", String(data.rating));
    formData.append("review_text", data.review_text);

    // Existing media IDs (send as array)
    if (Array.isArray(data?.existing_media_ids)) {
      data.existing_media_ids.forEach((i) => {
        formData.append("existing_media_ids[]", String(i));
      });
    }

    // New files
    if (Array.isArray(data.file)) {
      data.file.forEach((f) => {
        formData.append("file[]", f);
      });
    }

    // Optional: simulate network delay
    await delay(500);

    const res = await authApi.post(`/api/customer/updatereview/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Revalidate Next.js cache for reviews page
    revalidatePath("/dashboard/customer");

    return {
      success: true,
      message: res.data?.message || "Review Updated successfully",
    };
  } catch (err) {
    const status = err?.response?.status;

    // Validation errors
    if (status === 400) {
      return {
        success: false,
        message: "Validation error",
        errors: err?.response?.data?.errors,
      };
    }

    // Conflict errors (e.g., duplicate review)
    if (status === 409) {
      return {
        success: false,
        message: err?.response?.data?.error || "Review already exists",
      };
    }

    // Unprocessable entity
    if (status === 422) {
      return {
        success: false,
        message: err?.response?.data?.message || "Cannot process review",
      };
    }

    // Fallback
    return {
      success: false,
      message: "Something went wrong while creating the review",
    };
  }
};
