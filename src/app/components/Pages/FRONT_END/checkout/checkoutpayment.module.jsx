"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckoutUserDetailCard } from "@/app/components/CheckoutCards";
import BreakSection from "@/app/components/BreakSection";

// Define Zod schema using union for mutually exclusive payment methods
const cardDetailsSchema = z.object({
  paymentMethod: z.literal("cards"),
  cardDetails: z
    .string({ message: "Field Required" })
    .refine((value) => /^[0-9]{13,19}$/.test(value), {
      message: "Invalid card number",
    }),
  cvvDetails: z.string().min(3, { message: "CVV is not valid" }),
});

const paypalSchema = z.object({
  paymentMethod: z.literal("paypal"),
  paypalEmail: z.string().email("Please enter a valid Paypal id."),
});

// Combine schemas using z.union
const paymentSchema = z.union([cardDetailsSchema, paypalSchema]);

export const CheckoutPaymentForm = () => {
  const [init, setInit] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "",
      cardDetails: "",
      cvvDetails: "",
      paypalEmail: "",
    },
  });

  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    setInit(true);
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };

  if (!init) return null;

  return (
    <div className="flex flex-col gap-12">
      {/* Contact Details Section */}
      <div className="flex flex-col border rounded-xl">
        <h2 className="font-semibold text-lg text-Blueish p-4 border-b">
          Contact Details
        </h2>
        <CheckoutUserDetailCard />
        <CheckoutUserDetailCard />
        <CheckoutUserDetailCard />
      </div>

      {/* Payment Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border rounded-xl pb-4"
      >
        <h2 className="font-semibold text-lg text-Blueish p-6">
          Payment Details
        </h2>
        <div className="flex flex-col gap-4 px-6">
          {/* Debit/Credit Card Option */}
          <div>
            <label
              htmlFor="cards"
              className="flex w-full gap-2 justify-between px-6 p-4 font-semibold text-sm text-Blueish cursor-pointer border rounded-lg"
            >
              <span className="flex gap-4 items-center text-xs sm:text-base">
                <input
                  type="radio"
                  id="cards"
                  {...register("paymentMethod")}
                  value="cards"
                  onChange={() => setValue("paymentMethod", "cards")}
                  className="checked:accent-secondaryDark"
                />
                Debit/Credit Card
              </span>
              <img
                src="/assets/images/PaymentMerchant.png"
                alt="Payments logo"
                className="object-contain w-20 sm:w-auto sm:scale-100"
              />
            </label>
            {paymentMethod === "cards" && (
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <div className="w-full flex-[2]">
                  <input
                    type="text"
                    {...register("cardDetails")}
                    placeholder="XXX XXX XXX XXX"
                    className={`border focus:outline-none p-2 rounded-lg w-full ${
                      errors?.cardDetails ? "border-red-400" : ""
                    }`}
                  />

                  {errors.cardDetails && (
                    <p className="text-red-500 text-sm mt-1 ml-1">
                      {errors.cardDetails.message}
                    </p>
                  )}
                </div>
                <div className=" w-full flex-[1]">
                  <input
                    type="text"
                    {...register("cvvDetails")}
                    placeholder="CVV"
                    maxLength={3}
                    className={`border focus:outline-none p-2 rounded-lg w-full ${
                      errors?.cvvDetails ? "border-red-400" : ""
                    }`}
                  />
                  {errors.cvvDetails && (
                    <p className="text-red-500 text-sm mt-1 ml-1">
                      {errors.cvvDetails.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* PayPal Option */}
          <div>
            <label
              htmlFor="paypal"
              className="flex w-full justify-between px-6 p-4 font-semibold text-sm text-Blueish cursor-pointer border rounded-lg"
            >
              <span className="flex gap-4 items-center text-xs sm:text-base">
                <input
                  type="radio"
                  id="paypal"
                  {...register("paymentMethod")}
                  value="paypal"
                  onChange={() => setValue("paymentMethod", "paypal")}
                  className="checked:accent-secondaryDark"
                />
                PayPal
              </span>
              <img
                src="/assets/images/paypal.png"
                alt="PayPal logo"
                className="object-contain size-22"
              />
            </label>
            {paymentMethod === "paypal" && (
              <div className="mt-4">
                <input
                  // type="email"
                  {...register("paypalEmail")}
                  placeholder="Please Enter Paypal Id"
                  className={`border focus:outline-none p-2 rounded-lg w-full ${
                    errors?.paypalEmail ? "border-red-400" : ""
                  }`}
                />
                {errors.paypalEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.paypalEmail.message}
                  </p>
                )}
              </div>
            )}
          </div>
          <div>
            <button className=" underline text-secondaryDark">
              Enter Promo Code
            </button>
            <BreakSection marginTop={"mt-6"} className={"mb-2"} />
            <sup className="text-[#4D4D4D] space-y-2">
              By clicking 'Book Now', you agree to Weelp's Terms & Conditions
            </sup>

            <div className="flex justify-between flex-wrap sm:flex-nowrap gap-4">
              <div className="flex flex-col gap-1 w-full">
                <h3 className="capitalize text-lg font-semibold text-Blueish">
                  $6,790.18
                </h3>
                <span className="capitalize underline text-[#5a5a5a]">
                  Detailed Breakdown
                </span>
              </div>
              <button
                type="submit"
                className="disabled:bg-gray-500 max-w-full w-fit py-3 px-9 text-nowrap capitalize rounded-md bg-secondaryDark text-[#ffffff] text-base font-medium"
              >
                {isSubmitting ? "Submitting..." : "Book Now"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
