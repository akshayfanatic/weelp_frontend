import { authApi } from '../axiosInstance';

/**
 * Get Single Tag on Admin side
 * @param {Number} tagId
 * @returns []
 */
export async function getSingleTagAdmin(tagId) {
  try {
    const response = await authApi.get(`/api/admin/tags/${tagId}`, {
      headers: { Accept: 'application/json' },
    });
    return response.data;
  } catch (error) {
    return [];
  }
}
