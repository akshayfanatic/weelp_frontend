"use client";
import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import Link from "next/link";

const SelectTransferOption = () => {
  const selectRoute = [
    { label: "By Admin", icon: <User className="h-6 w-6" />, url: "/dashboard/admin/transfers/new/admin" }, // admin transfer creation
    { label: "By Vendor", icon: <User className="h-6 w-6" />, url: "/dashboard/admin/transfers/new/vendor" }, // vendor based transfer creation
  ];

  return (
    <Card className="bg-inherit border-none shadow-none h-[70vh] flex items-center justify-center">
      <CardHeader className="flex gap-4">
        <CardTitle>Create Transfer</CardTitle>
        <div className="grid grid-cols-2 gap-4">
          {selectRoute.map((route, index) => (
            <Link href={route.url} key={index} className="flex flex-col items-center justify-center size-52 p-4 shadow-md rounded-2xl hover:shadow-lg transition duration-300 cursor-pointer">
              <div className="bg-primary text-white p-3 rounded-full mb-2">{route.icon}</div>
              <p className="text-sm font-semibold">{route.label}</p>
            </Link>
          ))}
        </div>
      </CardHeader>
    </Card>
  );
};

export default SelectTransferOption;
