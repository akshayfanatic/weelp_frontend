import { authApi } from '../axiosInstance';

/**
 * Get Single Category on Admin side
 * @param {Number} categoryId
 * @returns []
 */
export async function getSingleCategoryAdmin(categoryId) {
  try {
    const response = await authApi.get(`/api/admin/categories/${categoryId}`, {
      headers: { Accept: 'application/json' },
    });
    return response.data;
  } catch (error) {
    return [];
  }
}
