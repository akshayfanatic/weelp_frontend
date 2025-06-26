"use client";

import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe/stripe";
import CheckoutForm from "./CheckoutForm";
import { useSession } from "next-auth/react";
import { CheckoutItems, CheckoutUserDetailCard } from "../CheckoutCards";
import useMiniCartStore from "@/lib/store/useMiniCartStore";
import { useUserProfile } from "@/hooks/api/customer/profile";
import { initializeCheckout } from "@/lib/actions/checkout"; // action for intialize checkout

const stripePromise = getStripe(); // import stripe promise
export default function CheckoutMainManual() {
  const { data: session } = useSession(); // session retrieve
  const { cartItems = [] } = useMiniCartStore(); // store items
  const { user } = useUserProfile(); // client side fetch user
  const item = cartItems.at(0) || {}; // item destructure
  const { price, currency } = item;

  const amount = parseInt(price); // convert to number
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // initialize paymnet
  const initializePayment = async () => {
    try {
      const res = await initializeCheckout({
        amount,
        currency: String(currency).toLowerCase(),
      });

      if (res?.success && res?.data?.clientSecret) {
        setClientSecret(res.data.clientSecret);
        sessionStorage.setItem("clientSecret", res.data.clientSecret);
      } else {
        setError("Client secret not received");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // on mount call generate
  useEffect(() => {
    const cachedSecret = typeof window !== "undefined" && sessionStorage.getItem("clientSecret");

    if (cachedSecret) {
      setClientSecret(cachedSecret);
      setLoading(false);
    } else {
      initializePayment();
    }
  }, []);

  // Show loading
  if (loading) {
    return (
      <div className="h-screen flex justify-center place-items-center">
        <span className="loader"></span>
      </div>
    );
  }

  //  Show error
  if (error) {
    return (
      <div className="text-center text-red-600 grid h-screen place-content-center">
        <p>Error: {error}</p>
        <button onClick={() => location.reload()} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
          Try Again
        </button>
      </div>
    );
  }

  //  is the key point: Only render <Elements> once clientSecret is available
  if (!clientSecret) {
    return <div className="text-center text-gray-600">Something went wrong. Please refresh.</div>;
  }

  return (
    <section className="flex flex-col-reverse xl:flex-row">
      <div className="w-full p-6 pt-10 pb-24 xl:w-3/5 max-w-3xl mx:auto xl:ml-auto xl:mr-28 space-y-4">
        <div className="flex flex-col border rounded-xl">
          <h2 className="font-semibold text-lg text-Blueish p-4 border-b">Contact Details</h2>

          {/* User Detail Card */}
          <CheckoutUserDetailCard userEmail={session?.user?.email} userName={session?.user?.name} />

          {/* Checkout Fields */}
          <Elements stripe={stripePromise} options={{ clientSecret: clientSecret }}>
            <CheckoutForm clientSecret={clientSecret} />
          </Elements>
        </div>
      </div>

      <div className="w-full p-6 pt-10 pb-24 xl:w-2/5 xl:ps-20 bg-[#f2f3f5]">
        <CheckoutItems />
      </div>
    </section>
  );

  // Fallback (should not happen ideally)
  return <div className="text-center text-gray-600">Something went wrong. Please refresh.</div>;
}
