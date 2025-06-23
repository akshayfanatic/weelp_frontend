export const dynamic = "force-dynamic";

import React from "react";
import UsersPageComponent from "@/app/components/Pages/DASHBOARD/admin/_rsc_pages/users/Users";
import { getAllUsersAdmin } from "@/lib/services/global";

const UsersPage = async () => {
  const { active_users, inactive_users, pending_users, total_users, users } = await getAllUsersAdmin();
  return <UsersPageComponent users={users ?? []} active_users={active_users ?? 0} inactive_users={inactive_users ?? 0} pending_users={pending_users ?? 0} total_users={total_users ?? 0} />;
};

export default UsersPage;
