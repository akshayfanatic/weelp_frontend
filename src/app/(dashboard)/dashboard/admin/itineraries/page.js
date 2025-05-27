"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ActivityPage = () => {
  return (
    <div>
      Itinerary Page
      <Button asChild>
        <Link className="" href="/dashboard/admin/itineraries/new">
          Create Itinerary
        </Link>
      </Button>
    </div>
  );
};

export default ActivityPage;
