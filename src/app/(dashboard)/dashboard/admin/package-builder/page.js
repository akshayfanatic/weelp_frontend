import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const Packagebuilder = () => {
  return (
    <div className="flex justify-between">
      Package Page
      <Button asChild>
        <Link className="" href="/dashboard/admin/package-builder/new">
          Create Package
        </Link>
      </Button>
    </div>
  );
};

export default Packagebuilder;
