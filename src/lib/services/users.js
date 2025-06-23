// This File Will Hanldle Customer Based Logics

import { authApi } from "../axiosInstance";

export const getUserProfile = async () => {
  try {
    const response = await authApi.get("/api/profile");

    if (response.status === 200) {
      return { user: response?.data?.user, error: null };
    } else {
      return { user: null, error: "Unexpected response from server." };
    }
  } catch (error) {
    console.log("Error fetching user:", error);
    return { user: null, error: "Failed to load profile. Please try again." };
  }
};
