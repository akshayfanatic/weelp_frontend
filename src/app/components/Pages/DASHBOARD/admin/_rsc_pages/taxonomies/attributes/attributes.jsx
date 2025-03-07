"use client";
import React from "react";
import { TaxonomiesPageTitle } from "../taxonomies_shared";
import { DataTableAttributes } from "./data-table";
import { cn } from "@/lib/utils";

const mockAttributes = [
  {
    id: "1",
    name: "Duration",
    slug: "duration",
    type: "select",
    values: ["1-2 hours", "2-4 hours", "4-8 hours", "Full day"],
    count: 120,
    status: "active",
  },
  {
    id: "2",
    name: "Difficulty Level",
    slug: "difficulty-level",
    type: "select",
    values: ["Easy", "Moderate", "Challenging", "Expert"],
    count: 85,
    status: "active",
  },
  {
    id: "3",
    name: "Age Group",
    slug: "age-group",
    type: "multiselect",
    values: ["Kids", "Teens", "Adults", "Seniors"],
    count: 95,
    status: "active",
  },
];

export const AttributePage = () => {
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
        <DataTableAttributes
          columns={[
            {
              accessorKey: "name",
              header: "Name",
            },
            {
              accessorKey: "type",
              header: "Type",
              cell: (value) => <span className="capitalize">{value}</span>,
            },
            {
              accessorKey: "values",
              header: "Values",
              cell: (value) => <span>{value.join(", ")}</span>,
            },
            {
              accessorKey: "count",
              header: "Count",
            },
            {
              accessorKey: "status",
              header: "Status",
              cell: (value) => (
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                    value === "active"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-50 text-gray-600"
                  )}
                >
                  {value}
                </span>
              ),
            },
          ]}
          data={mockAttributes}
          title="All Attributes"
          description="A list of all attributes used to define activity properties"
        />
      </div>
    </div>
  );
};
