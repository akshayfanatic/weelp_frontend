import React from "react";
import BookingCard from "@/app/components/BookingCard";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserDashboardReviewCard } from "@/app/components/ReviewCard";

export const CustomerReviewList = () => {
  return (
    <Card className="  shadow-none border-none bg-inherit  bg-white">
      <CardHeader className={"px-8"}>
        <CardTitle className="text-xl text-Blueish font-medium">Your Reviews</CardTitle>
        <CardDescription className="text-lg text-grayDark">Manage your Reviews, Create New.</CardDescription>
      </CardHeader>

      <Tabs defaultValue="active" className="w-full">
        <div className="p-8 pt-0 flex justify-between">
          <TabsList>
            <TabsTrigger className={"px-6"} value="active">
              Active
            </TabsTrigger>
            <TabsTrigger className={"px-6"} value="draft">
              Draft
            </TabsTrigger>
          </TabsList>
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Filters" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-[#f5f9fa] p-8 min-h-full h-[78vh]">
          <TabsContent value="active">
            {/** Here items come ** */}
            <div className="flex flex-wrap  bg-[#F5F9FA] gap-4">
              <UserDashboardReviewCard />
              <UserDashboardReviewCard />
              <UserDashboardReviewCard />
            </div>
          </TabsContent>

          <TabsContent value="draft"></TabsContent>
        </div>
      </Tabs>
    </Card>
  );
};
