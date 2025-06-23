"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "./overview";
import { Button } from "@/components/ui/button";
import { QuickActions } from "./quick-actions";
import { MetricCards } from "./metric-cards";
import { RecentSales } from "./recent-sales";

export function AdminDashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-xl md:text-3xl font-bold tracking-tight">Super Admin Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button className="bg-secondaryDark">Download</Button>
        </div>
      </div>

      {/* Role-specific metrics */}
      <MetricCards />

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Quick Actions</h3>
        <QuickActions />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
