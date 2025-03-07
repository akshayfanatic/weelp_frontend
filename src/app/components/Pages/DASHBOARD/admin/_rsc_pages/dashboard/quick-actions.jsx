"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Settings, PlusCircle } from "lucide-react";

const ActionCardData = [
  { title: "Manage Users", url: "/dashboard/admin/users", icon: <Users size={18} className="text-gray-400" /> },
  { title: "System Settings", url: "/dashboard/admin/settings", icon: <Settings size={18} className="text-gray-400"  /> },
  { title: "Add New Activity", url: "/dashboard/admin/activities", icon: <PlusCircle size={18} className="text-gray-400" /> },
];

export function QuickActions() {
  const router = useRouter();

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {ActionCardData.map((action, index) => (
        <Card
          key={index}
          className="cursor-pointer transition-all hover:bg-accent hover:shadow-md"
          onClick={() => router.push(action.url)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between w-full gap-2">
              {action.title}
              {action.icon}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="ghost" className="p-0 hover:bg-transparent">
              Get Started →
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
