"use server";

import { revalidatePath } from "next/cache";
import { authApi } from "../axiosInstance";
import { delay, log } from "../utils";

/**
 * Method for Create  Activity
 * @param {*} data
 * @returns {}
 */
export const createActivity = async (data) => {
  try {
    await delay(500);
    const res = await authApi.post("/api/admin/activities", data);
    return {
      success: true,
      message: res.data?.message,
    };
  } catch (err) {
    log(err?.response);
    const status = err?.response?.status;
    if (status === 400) {
      return {
        success: false,
        message: "Validation error",
        status: 400,
        errors: err.response.data.errors,
      };
    }

    if (status === 422) {
      const message = err.response.data.message;
      return {
        success: false,
        message: "Activity Already Exist",
      };
    }

    if (status === 500) {
      return {
        success: false,
        message: err.response.data.error || "Server error",
      };
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

/**
 * Method for Edit  Activity
 * @param {number} id  - Id of the Activity
 * @param data - Data means to Payload data
 * @returns {}
 */
export const editActivity = async (id, data) => {
  try {
    await delay(500);

    const res = await authApi.put(`/api/admin/activities/${id}`, data);

    // revalidate path
    if (res.status == 200) {
      revalidatePath("/dashboard/admin/activities/edit"); //revalidating path
      return {
        success: true,
        message: res.data?.message,
      };
    }
  } catch (err) {
    const status = err?.response?.status;
    if (status === 400) {
      return {
        success: false,
        message: err.response.data.message || "validation error",
        status: 400,
        errors: err.response.data.message,
      };
    }

    if (status === 422) {
      const message = err.response.data.message;
      return {
        success: false,
        message: "Activity Already Exist",
      };
    }

    if (status === 500) {
      return {
        success: false,
        message: err.response.data.error || "Server error",
      };
    }

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};


/**
 * Action to delete Activity
 * @param {number} activityId
 * @returns [{}]
 */
export async function deleteActivity(activityId) {
  try {
    const res = await authApi.delete(`/api/admin/activities/${activityId}/`);

    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
