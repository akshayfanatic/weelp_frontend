"use server";
import { authApi, publicApi } from "../axiosInstance";


/**
 * Get All Cities and Region
 * @returns []
 */
export const getCitiesRegions = async () => {
  try {
    const response = await publicApi.get(`/api/regions-cities`);

    return response?.data; //
  } catch (error) {
    console.log("Error fetching cities:", error);
    return []; // return empty array
  }
};



/**
 * Get All Categories
 * @returns []
 */
export const getCategories = async () => {
  try {
    const response = await publicApi.get(`/api/categories`);
    return response?.data?.data;
  } catch (error) {
    return [];
  }
};

export const getCategoriesAdmin = async () => {
  try {
    const response = await authApi.get(`/api/admin/categories`);
    return response?.data?.data;
  } catch (error) {
    return [];
  }
};



/**
 * Get All Cities
 * @returns []
 */
export const getAllCitiesAdmin = async () => {
  try {
    const response = await authApi.get("/api/admin/cities");
    return response?.data;
  } catch (error) {
    return [];
  }
};



/**
 * Get All Attributes
 * @returns []
 */
export const getAllAttributesAdmin = async () => {
  try {
    const response = await authApi.get("/api/admin/attributes");
    return response?.data?.data;
  } catch (error) {
    return [];
  }
};




/**
 * Get All TagsAdmin
 * @returns []
 */
export const getAllTagsAdmin = async () => {
  try {
    const response = await authApi.get("/api/admin/tags");
    return response?.data?.data;
  } catch (error) {
    return [];
  }
};



/**
 * Get All Users
 * @returns []
 */
export async function getAllUsersAdmin() {
  try {
    const response = await authApi.get("/api/admin/users");
    return response.data;
  } catch (error) {
    console.log("Error fetching users:", error);
    return [];
  }
}
