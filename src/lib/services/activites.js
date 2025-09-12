import { publicApi, authApi } from '../axiosInstance';
import { log } from '../utils';

/**
 * Get Single Activity on Client side
 * @param {String} activitySlug slug of the activity
 * @returns []
 */
export async function getSingleActivity(activitySlug) {
  try {
    const response = await publicApi.get(`/api/activities/${activitySlug}`, {
      headers: { Accept: 'application/json' },
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
      headers: { Accept: 'application/json' },
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
export async function getAllActivitesAdmin(search = '') {
  try {
    const response = await authApi.get(`/api/admin/activities/${search ? search : ''}`, {
      headers: { Accept: 'application/json' },
    });
    return response?.data;
  } catch (error) {
    return [];
  }
}

/**
 * Returns all Featured Activities
 * @returns []
 */
export async function getAllFeaturedActivities() {
  try {
    const response = await publicApi.get(`/api/activities/featured-activities`, {
      headers: { Accept: 'application/json' },
    });

    return response.data;
  } catch (error) {
    console.log('Error fetching city data:', error);
    return [];
  }
}
