"use server"
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