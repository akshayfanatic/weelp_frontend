"use client";
import React from "react";
import Checkout from "@/app/components/Pages/FRONT_END/checkout/Checkout";
import { useSession } from "next-auth/react";
import { LoginForm } from "@/app/components/Form/LoginForm";
import useMiniCartStore from "@/lib/store/useMiniCartStore";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const CheckoutPage = () => {
  const { data: session } = useSession();
  const { cartItems } = useMiniCartStore();
  return (
    <>
      {!session?.user ? (
        <div className="h-[80vh] flex items-center justify-center py-16">
          <LoginForm customUrl={"/checkout"} />
        </div>
      ) : cartItems.length > 0 ? (
        <Checkout />
      ) : (
        // when no item in cart
        <div className="h-[80vh] flex items-center justify-center py-16">     
          <p className="flex flex-col gap-4">
            Your cart is empty.{" "}
            <Link href={"/"} className={buttonVariants() + " bg-secondaryDark"}>
              Back to Home
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;
