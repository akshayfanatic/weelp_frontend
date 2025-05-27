import { publicApi, authApi } from "../axiosInstance";
import { log } from "../utils";


/**
 * Get All Transfers Admin
 * @param ##
 * @returns {}
 */
export async function getAllTransfersAdmin() {
  try {
    const response = await authApi.get(`/api/admin/transfers/`, {
      headers: { Accept: "application/json" },
    });
    return response?.data?.data;
  } catch (error) {
    return [];
  }
}
