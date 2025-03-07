import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FormResetPassword } from "@/app/components/Form/FormResetPassword";

const ResetPassword = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-gray-100 px-6">
      <FormResetPassword />
    </div>
  );
};

export default ResetPassword;
