import React from "react";
import { getSingleUserAdmin } from "@/lib/services/users";
import { isEmpty } from "lodash";
import { notFound } from "next/navigation";
import EditUserForm from "@/app/components/Pages/DASHBOARD/admin/_rsc_pages/users/forms/EditUser";

const EditUserPage = async ({ params }) => {
  const { id } = await params;

  const userData = await getSingleUserAdmin(id); // await async call

  // Show 404 if user not found
  if (isEmpty(userData)) {
    notFound();
  }

  const { user } = userData;
  return (
    <div>
      <h1>Edit User Page</h1>
      <p>User ID: {id}</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <EditUserForm userData={user} />
    </div>
  );
};

export default EditUserPage;
