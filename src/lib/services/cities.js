import { publicApi, authApi } from '../axiosInstance';
import { log } from '../utils';

/**
 * Get Single City on Admin side
 * @param {Number} id
 @returns {Promise<object>} - City data or empty object if not found
 */
export async function getSingleCityAdmin(id) {
  try {
    const response = await authApi.get(`/api/admin/cities/${id}`, {
      headers: { Accept: 'application/json' },
    });
    if (response.status === 200) {
      return response.data;
    }

    return {};
  } catch (error) {
    return {};
  }
}

/**
 * Fetches a list of cities for admin with optional query parameters.
 * @function
 * @param {string} [search=""] - Optional query string (must start with `?`).
 *   Example: "?name=india&page=2"
 * @returns {Promise<Object>} Returns the API response data if successful, otherwise returns an empty object.
 *
 * @example
 * const states = await getAllCitiesAdminV2("?name=india&page=2");
 */
export async function getAllCitiesAdminV2(search = '') {
  try {
    const response = await authApi.get(`/api/admin/cities/${search}`, {
      headers: { Accept: 'application/json' },
    });
    return response?.data;
  } catch (error) {
    return {};
  }
}

/**
 * Get Cities Options
 * @returns {Promise<{ success:boolean,data:[], total:number, current_page:number,per_page:number,total:number }>}
 * All Cities list data for form handling purpose e.g... {dropdowns, selects,etc}
 */
export async function getAllCitiesOptionsAdmin() {
  try {
    const response = await authApi.get(`/api/admin/cities/list`, {
      headers: { Accept: 'application/json' },
    });

    if (response.status === 200) {
      return response?.data?.data || []; // extract List
    }
    return {};
  } catch (error) {
    return {};
  }
}
