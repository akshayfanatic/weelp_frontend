import React from "react";
import { authApi } from "@/lib/axiosInstance";
import UsersPageComponent from "@/app/components/Pages/DASHBOARD/admin/_rsc_pages/Users";

// Server-side function to fetch users
async function fetchUsers() {
  try {
    const response = await authApi.get("/api/users");
    return response.data;
  } catch (error) {
    console.warn("Error fetching users:", error);
    return [];
  }
}

const UsersPage = async () => {
  const { active_users, inactive_users, pending_users, total_users, users } = await fetchUsers();

  return (
    <UsersPageComponent
      users={users ?? []}
      active_users={active_users ?? 0}
      inactive_users={inactive_users ?? 0}
      pending_users={pending_users ?? 0}
      total_users={total_users ?? 0}
    />
  );
};

export default UsersPage;
