import React from "react";
import {
  Calendar,
  MessageCircleMore,
  Phone,
  Star,
  Truck,
  User,
} from "lucide-react";
import { actualDate } from "@/lib/utils";
import Image from "next/image";

export const CheckoutUserDetailCard = ({
  userImagesrc,
  userName,
  userEmail,
  userPhoneno,
}) => {
  return (
    <div className="flex gap-4 p-4 items-center hover:bg-[#e9f3ee] cursor-pointer">
      <Image
        src={userImagesrc || "/assets/testimonial.png"}
        alt="userlogo"
        width={48}
        height={48}
        className="rounded-full"
      />
      <div className="flex flex-col">
        <h3 className="text-[#4D4D4D] font-bold text-sm capitalize">
          {userName ? userName : "Maya"}
        </h3>
        <span className="text-[#4D4D4D] text-base leading-6">
          {userEmail || "Email: test@test.com"}
        </span>
      </div>
    </div>
  );
};

export const CheckoutItemCard = ({ itemName, totalPassenger, date }) => {
  const { adults = "", children = "" } = totalPassenger;
  const { from } = date;
  return (
    <div className="bg-white max-w-md flex flex-col rounded-xl p-6 gap-2">
      <h3 className="text-Blueish font-semibold text-lg">
        {itemName || "Melaka Wonderland Water Theme Park"}
      </h3>
      
      <div className="flex items-center gap-2 text-[#5A5A5A] text-sm">
        <User size={20} />
        <span className="font-medium capitalize">
          {`${adults} adults , ${children && children + " children "}`}
        </span>
      </div>

      <div className="flex items-center gap-2 text-[#5A5A5A] text-sm">
        <Calendar size={20} />
        {from && <span className="font-medium">{actualDate(from)}</span>}
      </div>
    </div>
  );
};

// export const CheckoutTransferCard = ({ productTitle, carName, totalTime, imageSrc }) => {
//     return (
//         <div className='bg-white max-w-md w-full flex rounded-xl p-6 gap-4'>
//             <div className='flex flex-col gap-2 flex-[2]'>
//                 <h3 className='text-Blueish font-semibold text-lg text-wrap capitalize'>
//                     {productTitle || "private transfer"}
//                 </h3>
//                 <div className='flex items-center gap-2 text-[#5A5A5A] text-sm'>
//                     <Truck size={20} />
//                     <span className='font-medium capitalize'>{carName || "swift verna"}</span>
//                 </div>
//                 <div className='flex items-center gap-2 text-[#5A5A5A] text-sm'>
//                     <Calendar size={20} />
//                     <span className='font-medium capitalize'>{totalTime || "3 Oct, 11:30 AM"}</span>
//                 </div>
//             </div>
//             <div className='flex-[1] self-center'>
//                 <img
//                     src={imageSrc || "/assets/Card.png"}
//                     className='w-full  sm:max-w-fit sm:w-auto sm:size-28 object-cover rounded-md'
//                     alt="Card Image"
//                 />
//             </div>
//         </div>
//     )
// }

export const CheckoutReview = () => {
  return (
    <div className="mt-6">
      <div className="flex gap-2">
        <h3 className="text-Blueish text-xl font-semibold flex gap-[2px]">
          Excellent
        </h3>
        <div className="flex gap-[1px]">
          <Star className="bg-[#00B67A] text-white fill-white p-[4px] text-lg size-5" />
          <Star className="bg-[#00B67A] text-white fill-white p-[4px] text-lg size-5" />
          <Star className="bg-[#00B67A] text-white fill-white p-[4px] text-lg size-5" />
          <Star className="bg-[#00B67A] text-white fill-white p-[4px] text-lg size-5" />
          <Star className="bg-[#00B67A] text-white fill-white p-[4px] text-lg size-5" />
        </div>
        <span className="flex gap-1 font-semibold">
          <Star className="text-xl size-5 text-[#00B67A] fill-[#00B67A]" />
          Trustpilot
        </span>
      </div>
      <p className=" text-sm text-black">Based on 222,945 traveler reviews</p>
      <div className="mt-4">
        <h3 className="text-Blueish text-xl font-semibold flex gap-[2px]">
          Questions?
        </h3>
        <p className="text-sm text-black">
          Visit the Weelp Help Centre for any further <br /> questions.
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <p className="flex items-center gap-2 text-xs text-black">
          <Phone size={16} className="fill-[#4D4D4D]" />
          <span>+1 (702) 648-5873</span>
        </p>
        <p className="flex items-center gap-2 text-xs text-black">
          <MessageCircleMore size={16} className="text-[#4D4D4D]" />
          <span>Chat now</span>
        </p>
      </div>
    </div>
  );
};
