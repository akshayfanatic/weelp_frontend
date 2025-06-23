"use server";
import { authApi } from "../axiosInstance";

/**
 * Get Single Package on Admin side
 * @param {Number} id
 * @returns []
 */
export const getSinglePackageAdmin = async (id) => {
  try {
    const response = await authApi.get(`/api/admin/packages/${id}`, {
      headers: { Accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    return {};
  }
};



/**
 * Get All Packages Admin
 * @param {string} search
 * @returns {}
 */
export async function getAllPackagesAdmin(search = "") {
  try {
    const response = await authApi.get(`/api/admin/packages/${search ? search : ""}`, {
      headers: { Accept: "application/json" },
    });
    return response?.data;
  } catch (error) {
    return { success: false, data: [], message: "Failed to fetch Packages" };
  }
}
