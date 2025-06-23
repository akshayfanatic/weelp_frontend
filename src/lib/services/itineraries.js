import { publicApi, authApi } from "../axiosInstance";
import { log } from "../utils";

/**
 * Get Single Itinerary on Client side
 * @param {String} slug
 * @returns []
 */
export const getSingleItinerary = async (slug) => {
  try {
    const response = await publicApi.get(`/api/itineraries/${slug}`, {
      headers: { Accept: "application/json" },
    });
    return response?.data;
  } catch (error) {
    return []; // Return null to trigger 404
  }
};

/**
 * Get Single Itinerary on Admin side
 * @param {Number} id
 * @returns []
 */
export const getSingleItineraryAdmin = async (id) => {
  try {
    const response = await authApi.get(`/api/admin/itineraries/${id}`, {
      headers: { Accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    return {};
  }
};


/**
 * Get All Itineraries Admin
 * @param {string} search
 * @returns {}
 */
export async function getAllItinerariesAdmin(search = "") {
  try {
    const response = await authApi.get(`/api/admin/itineraries/${search ? search : ""}`, {
      headers: { Accept: "application/json" },
    });
    return response?.data;
  } catch (error) {
    return { success: false, data: [], message: "Failed to fetch itineraries" };
  }
}

