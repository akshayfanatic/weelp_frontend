export const dynamic = 'force-dynamic';
import { isEmpty } from "lodash";
import { notFound } from "next/navigation";
import { CategoryPage } from "@/app/components/Pages/DASHBOARD/admin/_rsc_pages/taxonomies/category/category";
import { getCategoriesAdmin } from "@/lib/services/global";

const CategoriesPage = async () => {
  const data = await getCategoriesAdmin();
  let categories = data ?? [];

  // 404 if api not working
  if (isEmpty(categories)) {
    notFound();
  }
  return <CategoryPage categories={categories} />;
};

export default CategoriesPage;
