import { authApi } from "../axiosInstance";
import { log } from "../utils";

/**
 * Get All Vendors
 * @param {string} [query] - Optional query string (e.g., ?page=1)
 * @returns {Promise<{ success:boolean,data:[], total:number, current_page:number,per_page:number,total:number }>} - Vendor list data
 */
export async function getAllVendorsAdmin(query = "") {
  try {
    const response = await authApi.get(`/api/admin/vendors${query ? query : ""}`, {
      headers: { Accept: "application/json" },
    });

    if (response.status === 200) {
      return response?.data;
    }
    return {};
  } catch (error) {
    return {};
  }
}

/**
 * Get Vendor Route By Id
 * @param {string} [query] - Optional query string (e.g., ?page=1)
 * @returns {Promise<{ success:boolean,data:[], total:number, current_page:number,per_page:number,total:number }>} - Vendor list data
 */
export async function getRoutesByVendorIdAdmin(vendorId, query) {
  try {
    const response = await authApi.get(`/api/admin/vendors/${vendorId}/routes${query}`, {
      headers: { Accept: "application/json" },
    });

    // log(response)

    if (response.status === 200) {
      return response?.data;
    }
    return {};
  } catch (error) {
    return {};
  }
}



/**
 * Get Vendor Price  By vendorId
 * @param {string} [query] - Optional query string (e.g., ?page=1)
 * @returns {Promise<{ success:boolean,data:[], total:number, current_page:number,per_page:number,total:number }>} - Vendor list data
 */
export async function getPriceByVendorIdAdmin(vendorId, query) {
  try {
    const response = await authApi.get(`/api/admin/vendors/${vendorId}/pricing-tiers${query}`, {
      headers: { Accept: "application/json" },
    });

    // log(response)

    if (response.status === 200) {
      return response?.data;
    }
    return {};
  } catch (error) {
    return {};
  }
}
