'use server';

import { authApi } from '../axiosInstance';

/**
 * Get Single Attribute on Admin side
 * @param {Number} attributeId
 * @returns []
 */
export async function getSingleAttributeAdmin(attributeId) {
  try {
    const response = await authApi.get(`/api/admin/attributes/${attributeId}`, {
      headers: { Accept: 'application/json' },
    });

    return response?.data;
  } catch (error) {
    return [];
  }
}

/**
 * Get Attribute By Slug on Admin side
 * @param {String} slug slug of the attribute
 * @returns []
 */
export async function getAttributeBySlugAdmin(slug) {
  try {
    const response = await authApi.get(`/api/admin/attributes/slug/${slug}`, {
      headers: { Accept: 'application/json' },
    });

    return response?.data?.data || [];
  } catch (error) {
    console.error('Attribute Slug ', error);
    return [];
  }
}
