import { authApi } from "../axiosInstance";
import { log } from "../utils";

/**
 * Get Destination Places *** {dropdowns} Form Oriented ***
 * @returns {Promise<{ success:boolean,data:[] }>} -Api For For All Vendor driver list data for form handling form purpose e.g... {dropdowns, selects,etc}
 */
export async function getPlacesByAdminOptions() {
  try {
    const response = await authApi.get(`/api/admin/places/place-dropdown`, {
      headers: { Accept: "application/json" },
    });

    if (response.status === 200) {
      return response?.data;
    }

    return {};
  } catch (error) {
    console.error("Service Error:", error);
    throw new Error("Failed to fetch data from backend server");
  }
}
