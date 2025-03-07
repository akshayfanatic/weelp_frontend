import React from "react";
import BookingCard from "@/app/components/BookingCard";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CustomerBookingsList = () => {
  return (
    <Card className="shadow-none border-none bg-inherit  bg-white ">
      <CardHeader className={"px-8"}>
        <CardTitle className="text-xl text-Blueish font-medium">
          Your Bookings
        </CardTitle>
        <CardDescription className="text-lg text-grayDark">
          Manage your bookings, plans.
        </CardDescription>
      </CardHeader>

      <Tabs defaultValue="completed" className="w-full ">
        <div className="p-8 pt-0 flex justify-between">
          <TabsList>
            <TabsTrigger className={"dark:bg-black"} value="completed">Completed</TabsTrigger>
            <TabsTrigger className={"dark:bg-black"} value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
          <Select>
            <SelectTrigger className="w-[120px] dark:bg-black ">
              <SelectValue placeholder="Filters" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup >
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-[#f5f9fa] p-8 min-h-full h-[78vh]">
          <TabsContent value="completed">
            <div className="flex flex-wrap  bg-[#F5F9FA] gap-4">
              <BookingCard />
              <BookingCard />
              <BookingCard />
            </div>
          </TabsContent>

          <TabsContent value="password">No Producct</TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};
