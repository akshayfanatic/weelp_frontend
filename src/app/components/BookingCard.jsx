import React from "react";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const BookingCard = ({ bookingItem = {} }) => {
  const { id, travel_date, item: { name, city } = {} } = bookingItem;
  return (
    <Card className="bg-white rounded-lg p-4 flex flex-col gap-4  shadow-md max-w-lg w-full dark:bg-black">
      <CardHeader className="grid grid-cols-2 py-2 flex-wrap">
        <CardTitle className={"text-[#143042] text-xl font-semibold"}>{name}</CardTitle>
        <span className="text-[#143042] text-base font-normal text-end ">{travel_date}</span>
        <span className="text-grayDark text-base font-normal">{city}</span>


        <span className="text-gray-400  text-base text-end font-medium">Booking Id :{id}</span>
      
      </CardHeader>
      <CardContent className="border py-2 space-y-2 border-y-graycolor border-x-0  ">
        <CardTitle className={"text-black text-base font-semibold"}>Your Review</CardTitle>
        <ul className="flex">
          <li>
            <Star className=" fill-yellow-300 text-yellow-300" />
          </li>
          <li>
            <Star className=" fill-yellow-300 text-yellow-300" />
          </li>
          <li>
            <Star className=" fill-yellow-300 text-yellow-300" />
          </li>
        </ul>
      </CardContent>

      <Card className="flex justify-between items-center shadow-none border-none px-4 dark:bg-black">
        <Image src={"/assets/Review.png"} width={48} height={100} alt="booking_image" />
        <Button className={"bg-secondaryDark text-base font-normal hover:bg-secondaryDark dark:hover:bg-secondaryDark dark:hover:text-white"}>View Booking</Button>
      </Card>

    </Card>
  );
};

export default BookingCard;
