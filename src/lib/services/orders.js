import { authApi } from "../axiosInstance";

/**
 * Get Single Order Admin
 * @param {number} orderId Id of the order
 * @returns {}
 */
export async function getSingleOrderAdmin(orderId) {
  try {
    const res = await authApi.get(`/api/admin/orders/${orderId}`, {
      headers: { Accept: "application/json" },
    });

    // for handling diffrent response
    if (res.status === 200) return res.data;
    if (res.status === 404) return {}; // not found

    return {}; // fallback for other statuses
  } catch (error) {
    console.log("Error fetching order:", error?.message || error);
    return {}; // network error or unexpected exception
  }
}

/**
 * Get All Orders Admin
 * @param ##
 * @returns {}
 */
export async function getAllOrdersAdmin(search = "") {
  try {
    const response = await authApi.get(`/api/admin/orders/${search ? search : ""}`, {
      headers: { Accept: "application/json" },
    });
    return response?.data;
  } catch (error) {
    return {};
  }
}



/**
 * Get All Users Orders
 * @param {string} search search query if exist
 * @returns {}
 */
export async function getAllUsersOrdersAdmin(search = "") {
  try {
    const res = await authApi.get(`/api/userorders/${search ? search : ""}`, {
      headers: { Accept: "application/json" },
    });

    // for handling diffrent response
    if (res.status === 200) return res.data;
    if (res.status === 404) return {}; // not found

    return {}; // fallback for other statuses
  } catch (error) {
    return {};
  }
}
