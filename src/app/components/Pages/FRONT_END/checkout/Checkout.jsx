import React from "react";
import { CheckoutItems } from "./checkoutitems.module";
import { CheckoutPaymentForm } from "./checkoutpayment.module";

const Checkout = () => {
  return (
    <section className="flex flex-col-reverse xl:flex-row">
      <div className="w-full p-6 pt-10 pb-24 xl:w-3/5 max-w-3xl mx:auto xl:ml-auto xl:mr-28">
        <CheckoutPaymentForm />
      </div>
      <div className="w-full p-6 pt-10 pb-24 xl:w-2/5 xl:ps-20 bg-[#f2f3f5]">
        <CheckoutItems />
      </div>
    </section>
  );
};

export default Checkout;
