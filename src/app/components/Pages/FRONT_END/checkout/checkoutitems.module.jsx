import React from "react";
import {
  CheckoutItemCard,
  CheckoutReview,
} from "@/app/components/Pages/FRONT_END/checkout/CheckoutCards";
import useMiniCartStore from "@/lib/store/useMiniCartStore";

// This Module Handle Checkout Items
export const CheckoutItems = () => {
  const { cartItems=[] } = useMiniCartStore();

  return (
    <div className="flex flex-col gap-4 justify-between">
      {cartItems && cartItems.length > 0 ? (
        cartItems.map((val, index) => {
          return <CheckoutItemCard key={index} itemName={val?.name} totalPassenger={val?.howMany} date={val?.dateRange}  />;
        })
      ) : (
        <p>Sorry No items in cart</p>
      )}

      <CheckoutReview />
    </div>
  );
};
