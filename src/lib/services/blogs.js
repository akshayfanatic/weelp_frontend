'use server';

import { authApi } from '../axiosInstance';
import { log } from '../utils';

/**
 * Get a blog by ID (Admin)
 * @param {string} blogId - ID of the blog
 * @returns {Promise<{success: boolean, data?: any, message?: string}>}
 */
export async function getSingleBlogAdmin(blogId) {
  try {
    const response = await authApi.get(`/api/admin/blogs/${blogId}`, {
      headers: { Accept: 'application/json' },
    });

    return {
      success: true,
      data: response?.data,
    };
  } catch (error) {
    console.error('getSingleBlogAdmin error:', error);

    const status = error?.response?.status;

    return {
      success: false,
      message: status === 404 ? 'Blog not found' : error?.message || 'Something went wrong',
    };
  }
}
