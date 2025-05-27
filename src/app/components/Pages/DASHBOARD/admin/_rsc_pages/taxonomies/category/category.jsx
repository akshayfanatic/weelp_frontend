"use client";

import { TaxonomiesPageTitle } from "../taxonomies_shared";
import { DataTableCategory} from "./data-table-category";

export const CategoryPage = ({ categories }) => {
  return (
    <div>
      <TaxonomiesPageTitle
        title="Categories"
        description="Manage activity categories and their organization"
        buttoninfo={{
          buttonName: "Add Category",
          buttonurl: "/dashboard/admin/taxonomies/categories/new",
        }}
      />

      <div className="space-y-4">
        <DataTableCategory categories={categories} />
      </div>
    </div>
  );
};
