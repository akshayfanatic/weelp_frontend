"use client"
import { TaxonomiesPageTitle } from "../taxonomies_shared";
import { DataTableTags } from "./data-table";
import { cn } from "@/lib/utils";

const mockTags = [
  {
    id: "1",
    name: "Family Friendly",
    slug: "family-friendly",
    description: "Activities suitable for families with children",
    count: 45,
    status: "active",
  },
  {
    id: "2",
    name: "Pet Friendly",
    slug: "pet-friendly",
    description: "Activities that allow pets",
    count: 32,
    status: "active",
  },
  {
    id: "3",
    name: "Wheelchair Accessible",
    slug: "wheelchair-accessible",
    description: "Activities with wheelchair accessibility",
    count: 28,
    status: "active",
  },
];

export const TagPage = () => {
  return (
    <div className="space-y-4">
      <TaxonomiesPageTitle
        title={"tags"}
        buttoninfo={{
          buttonName: "add tag",
          buttonurl: "/dashboard/admin/taxonomies/tags/new",
        }}
      />

      <div className="space-y-4">
        <DataTableTags
          columns={[
            {
              accessorKey: "name",
              header: "Name",
            },
            {
              accessorKey: "description",
              header: "Description",
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
          data={mockTags}
          title="All Tags"
          description="A list of all tags used to organize activities"
        />
      </div>
    </div>
  );
};
