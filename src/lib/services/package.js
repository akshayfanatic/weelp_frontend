'use server';
import { authApi, publicApi } from '../axiosInstance';
import { log } from '../utils';

/**
 * Get Single Package on Public side
 * @param {Number} id
 * @returns []
 */
export async function getSinglePackage(packagee) {
  try {
    const response = await publicApi.get(`/api/packages/${packagee}`, {
      headers: { Accept: 'application/json' },
    });

    return response.data;
  } catch (error) {
    return []; // Return null instead of an empty array for clarity
  }
}

/**
 * Get Single Package on Admin side
 * @param {Number} id
 * @returns []
 */
export const getSinglePackageAdmin = async (id) => {
  try {
    const response = await authApi.get(`/api/admin/packages/${id}`, {
      headers: { Accept: 'application/json' },
    });
    return response.data;
  } catch (error) {
    return {};
  }
};

/**
 * Get All Packages Admin
 * @param {string} search
 * @returns {}
 */
export async function getAllPackagesAdmin(search = '') {
  try {
    const response = await authApi.get(`/api/admin/packages/${search ? search : ''}`, {
      headers: { Accept: 'application/json' },
    });
    return response?.data;
  } catch (error) {
    return { success: false, data: [], message: 'Failed to fetch Packages' };
  }
}

/**
 * Get Citites BY Region Public Api
 * @param {string} region region required
 * @returns
 */
export const getPackageDataByRegion = async (region) => {
  try {
    const response = await publicApi.get(`/api/region/${region}/region-packages`, {
      headers: { Accept: 'application/json' },
    });

    if (response.status === 200) {
      return response?.data;
    }
    return {}; // Return empty object if not 200
  } catch (error) {
    return {}; // Return empty object on error
  }
};
