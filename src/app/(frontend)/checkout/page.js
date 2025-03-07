"use client";
import React from "react";
import Checkout from "@/app/components/Pages/FRONT_END/checkout/Checkout";
import { useSession } from "next-auth/react";
import { LoginForm } from "@/app/components/Form/LoginForm";

const CheckoutPage = () => {
  const { data: session } = useSession();
  return (
    <>
      {!session?.user ? (
        <div className="h-[80vh] flex items-center justify-center py-16">
          <LoginForm customUrl={'/checkout'} />
        </div>
      ) : (
        <Checkout />
      )}
    </>
  );
};

export default CheckoutPage;
