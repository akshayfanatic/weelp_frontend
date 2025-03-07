import React from "react";
import { Star } from "lucide-react";
import Link from "next/link";
const SingleProductCard = ({
  productId,
  imgsrc,
  productRating,
  productTitle,
  productPrice,
  discount,
}) => {
  return (
    <div
      className={`${
        "product_" + productId
      } bg-white  rounded-lg p-4 gap-3 shadow-md sm:max-w-fit max-w-full min-h-[360px] h-fit w-full sm:mx-0`}
    >
      <Link href={"/region/europe/city/london/destination/xyz"}>
        {" "}
        {/** this is static link */}
        <img
          src={imgsrc || "/assets/Card.png"}
          alt="productimage"
          className="rounded-lg w-full sm:w-72 h-52 object-cover "
        />
        <div className="flex flex-col gap-[6px] justify-evenly py-1">
          <div className="flex gap-1 text-secondaryDark text-sm">
            <Star className="fill-current" size={18} />
            {productRating || 4.5}
            <span
              className="text-[#5A5A5A]"
              dangerouslySetInnerHTML={{ __html: "(3.4K)" }}
            />
          </div>
          <h3 className="text-black text-lg font-semibold">
            {productTitle || "Evening Dessert - Premium"}
          </h3>
          <hr className=" border-t border-dashed border-gray-300 mb-1" />
          <div className="flex justify-between flex-wrap gap-2">
            <h5 className="flex flex-col  text-gray-500 font-semibold">
              <span className="font-normal">From</span>
              {productPrice || "$1200"}
            </h5>
            <button className=" border border-dangerSecondary text-dangerSecondary bg-dangerLite font-semibold py-2 px-4 uppercase rounded-md">
              40% off
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SingleProductCard;
