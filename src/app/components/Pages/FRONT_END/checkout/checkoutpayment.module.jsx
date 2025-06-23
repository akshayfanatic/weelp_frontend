"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckoutUserDetailCard } from "@/app/components/Pages/FRONT_END/checkout/CheckoutCards";
import { useSession } from "next-auth/react";

// Define Zod schema using union for mutually exclusive payment methods
const cardDetailsSchema = z.object({
  paymentMethod: z.literal("cards"),
  cardDetails: z.string({ message: "Field Required" }).refine((value) => /^[0-9]{13,19}$/.test(value), {
    message: "Invalid card number",
  }),
  cvvDetails: z.string().regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits" }),
});

const paypalSchema = z.object({
  paymentMethod: z.literal("paypal"),
  paypalEmail: z.string().email("Please enter a valid Paypal ID."),
});

// Combine schemas using z.union
const paymentSchema = z.union([cardDetailsSchema, paypalSchema]);

export const CheckoutPaymentForm = () => {
  const [init, setInit] = useState(false);
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "cards",
      cardDetails: "",
      cvvDetails: "",
      paypalEmail: "",
    },
    mode: "onChange",
  });

  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    setInit(true);
  }, []);

  const onSubmit = (data) => {
    console.log({
      ...data,
      userInfo: session?.user || null, // Include user info in submission
    });
  };

  if (!init) return null;

  return (
    <div className="flex flex-col gap-12">
      {/* Contact Details Section */}
      <div className="flex flex-col border rounded-xl">
        <h2 className="font-semibold text-lg text-Blueish p-4 border-b">Contact Details</h2>

        {session?.user ? <CheckoutUserDetailCard userEmail={session.user.email} userName={session.user.name} /> : <div className="p-4 text-gray-500">No user logged in</div>}
      </div>

      {/* Payment Form Section */}
      <form onSubmit={handleSubmit(onSubmit)} className="border rounded-xl pb-4">
        <h2 className="font-semibold text-lg text-Blueish p-6">Payment Details</h2>
        <div className="flex flex-col gap-4 px-6">
          {/* Debit/Credit Card Option */}
          <div>
            <label htmlFor="cards" className="flex w-full gap-2 justify-between px-6 p-4 font-semibold text-sm text-Blueish cursor-pointer border rounded-lg">
              <span className="flex gap-4 items-center text-xs sm:text-base">
                <input type="radio" id="cards" {...register("paymentMethod")} value="cards" className="checked:accent-secondaryDark" />
                Debit/Credit Card
              </span>
            </label>
            {paymentMethod === "cards" && (
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <div className="w-full flex-[2]">
                  <input type="text" {...register("cardDetails")} placeholder="XXX XXX XXX XXX" className={`border p-2 rounded-lg w-full ${errors?.cardDetails ? "border-red-400" : ""}`} />
                  {errors.cardDetails && <p className="text-red-500 text-sm mt-1">{errors.cardDetails.message}</p>}
                </div>
                <div className="w-full flex-[1]">
                  <input type="text" {...register("cvvDetails")} placeholder="CVV" maxLength={4} className={`border p-2 rounded-lg w-full ${errors?.cvvDetails ? "border-red-400" : ""}`} />
                  {errors.cvvDetails && <p className="text-red-500 text-sm mt-1">{errors.cvvDetails.message}</p>}
                </div>
              </div>
            )}
          </div>

          {/* PayPal Option */}
          <div>
            <label htmlFor="paypal" className="flex w-full justify-between px-6 p-4 font-semibold text-sm text-Blueish cursor-pointer border rounded-lg">
              <span className="flex gap-4 items-center text-xs sm:text-base">
                <input type="radio" id="paypal" {...register("paymentMethod")} value="paypal" className="checked:accent-secondaryDark" />
                PayPal
              </span>
            </label>
            {paymentMethod === "paypal" && (
              <div className="mt-4">
                <input type="email" {...register("paypalEmail")} placeholder="Please Enter Paypal ID" className={`border p-2 rounded-lg w-full ${errors?.paypalEmail ? "border-red-400" : ""}`} />
                {errors.paypalEmail && <p className="text-red-500 text-sm mt-1">{errors.paypalEmail.message}</p>}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={!isValid || isSubmitting} className={`disabled:bg-gray-500 w-fit py-3 px-9 rounded-md ${isValid ? "bg-secondaryDark" : "bg-gray-500"} text-white`}>
            {isSubmitting ? "Submitting..." : "Book Now"}
          </button>
        </div>
      </form>
    </div>
  );
};
