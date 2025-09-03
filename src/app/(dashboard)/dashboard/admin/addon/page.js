import React from "react";
import { FilteredAddOn } from "@/app/components/Pages/DASHBOARD/admin/_rsc_pages/addons/FilteredAddOn";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AddOnPage = () => {
  return (
    <Card className="border-none shadow-none bg-inherit space-y-4">
      <div className="flex justify-end">
        <Link aschild="true" href="/dashboard/admin/addon/new">
          <Button variant="secondary">
            <Plus size={16} /> Create Add On
          </Button>
        </Link>
      </div>
      <FilteredAddOn />
    </Card>
  );
};

export default AddOnPage;
