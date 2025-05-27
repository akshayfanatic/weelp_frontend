"use server"
import { publicApi } from "../axiosInstance";


/**
 * Get Region Details Frontend
 * @param {*} region
 * @returns []
 */
export const fetchRegionDetails = async (region) => {
  try {
    const response = await publicApi(`api/region/${region}`);
    return response?.data?.data;
  } catch (error) {
    console.log("Error fetching region details:", error);
    return [];
  }
};
