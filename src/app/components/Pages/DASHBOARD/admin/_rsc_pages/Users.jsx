"use client";

// Main User Page
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Plus } from "lucide-react";
import { cn, log } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { typography } from "@/utils/typography";

//for table
import { DataTable } from "./datatable/data-table";
import { columns } from "./datatable/columns";

// mock user
const UsersPageComponent = ({
  users = [],
  active_users = 0,
  pending_users = 0,
  total_users = 0,
}) => {
  return (
    <div className="space-y-4 sm:p-8 sm:pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={cn(typography["page-title"])}>Users</h2>
          <p className={cn(typography["text-sm-secondary"])}>
            Manage system users and their access
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/admin/users/new">
            <Button
              className={
                "bg-transparent hover:bg-transparent text-black  hover:text-black border text-xs"
              }
            >
              <Download className="mr-2 h-2 w-2" />
              Export
            </Button>
          </Link>
          <Link href="/dashboard/admin/users/new">
            <Button className={"bg-secondaryDark"}>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </Link>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        {/* Total Users */}
        <Card className="hover:shadow-md ease-in-out duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={cn(typography["card-title"])}>
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn(typography["card-stat"])}>{total_users}</div>
            <p className={cn(typography["card-stat-label"])}>
              Across all departments
            </p>
          </CardContent>
        </Card>

        {/* Active Users*/}
        <Card className="hover:shadow-md ease-in-out duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={cn(typography["card-title"])}>
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn(typography["card-stat"])}>{active_users}</div>
            <p className={cn(typography["card-stat-label"])}>
              Currently active in the system
            </p>
          </CardContent>
        </Card>

        {/* Pending User */}
        <Card className="hover:shadow-md ease-in-out duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className={cn(typography["card-title"])}>
              Pending Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={cn(typography["card-stat"])}>{pending_users}</div>
            <p className={cn(typography["card-stat-label"])}>
              Awaiting activation
            </p>
          </CardContent>
        </Card>
      </div>

      {/* tables */}
      <Card className="shadow-none  mx-auto p-10 space-y-2">
        <CardTitle className={"text-base mb-8"}>Users Overview</CardTitle>
        <DataTable columns={columns} data={users} />
      </Card>
    </div>
  );
};

export default UsersPageComponent;
