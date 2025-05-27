import { publicApi, authApi } from "../axiosInstance";
import { log } from "../utils";


/**
 * Get Single Activity on Client side
 * @param {String} activitySlug
 * @returns []
 */
export async function getSingleActivity(activitySlug) {
  try {
    const response = await publicApi.get(`/api/activities/${activitySlug}`, {
      headers: { Accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    return [];
  }
}



/**
 * Get Single Activity on Admin side
 * @param {Number} id
 * @returns []
 */
export async function getSingleActivityAdmin(id) {
  try {
    const response = await authApi.get(`/api/admin/activities/${id}`, {
      headers: { Accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    return {};
  }
}



/**
 * Get All Activities Admin
 * @param ##
 * @returns {}
 */
export async function getAllActivitesAdmin() {
  try {
    const response = await authApi.get(`/api/admin/activities/`, {
      headers: { Accept: "application/json" },
    });
    return response?.data?.data;
  } catch (error) {
    return [];
  }
}
