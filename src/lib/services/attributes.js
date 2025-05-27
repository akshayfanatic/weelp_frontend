import { authApi } from "../axiosInstance";


/**
 * Get Single Attribute on Admin side
 * @param {Number} attributeId
 * @returns []
 */
export async function getSingleAttributeAdmin(attributeId) {
  try {
    const response = await authApi.get(`/api/admin/attributes/${attributeId}`, {
      headers: { Accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    return [];
  }
}
