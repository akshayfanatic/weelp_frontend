"use server";
import { publicApi } from "../axiosInstance";


/**
 * This method return the region details
 * @param {*} region
 * @returns []
 */
export const fetchRegionDetails = async (region) => {
  try {
    const response = await publicApi(`api/region/${region}`);
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching region details:", error);
    return [];
  }
};

/**
 * Get All Cities of Region
 * @param {string} region region slug
 * @returns []
 */
export const getCitiesByRegion = async (region) => {
  try {
    const response = await publicApi.get(`/api/region/${region}/cities/`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching city data:");

    return [];
  }
};



/**
 * Get Region All Items
 * @param {string} region region of the items
 * @param {string} query query params
 * @return {}
 */

export const getItemsByRegion = async (region, query = "") => {
  try {
    const response = await publicApi.get(`/api/region/${region}/region-all-items${query}/`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching city data:");

    return {};
  }
};
