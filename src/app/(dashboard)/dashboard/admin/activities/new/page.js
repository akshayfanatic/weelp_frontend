export const dynamic = 'force-dynamic';

import { getAllTagsAdmin, getAllCitiesAdmin, getAllAttributesAdmin, getCategoriesAdmin } from "@/lib/services/global";
import { CreateActivityForm } from "@/app/components/Pages/DASHBOARD/admin/_rsc_pages/activities/CreateActivityForm";

// RSC
const CreateActivity = async () => {
  const [tags, locations, attributes, categories] = await Promise.all([getAllTagsAdmin(), getAllCitiesAdmin(), getAllAttributesAdmin(), getCategoriesAdmin()]);

  return <CreateActivityForm tags={tags} locations={locations} /** locations == cities */ attributes={attributes} categories={categories} />;
};

export default CreateActivity;
