"use client";
import React from "react";
import { TaxonomiesPageTitle } from "../taxonomies_shared";
import { DataTableAttributes } from "./data-table";
import { cn } from "@/lib/utils";

export const AttributePage = ({ attributes = [] }) => {
  
  return (
    <div className="space-y-4">
      <TaxonomiesPageTitle
        title={"attributes"}
        buttoninfo={{
          buttonName: "add attribute",
          buttonurl: "/dashboard/admin/taxonomies/attributes/new",
        }}
      />

      <div className="space-y-4">
        <DataTableAttributes attributes={attributes} />
      </div>
    </div>
  );
};
