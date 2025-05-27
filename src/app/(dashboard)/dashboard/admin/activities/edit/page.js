export const dynamic = 'force-dynamic';

import React from "react";
import { getAllTagsAdmin, getAllCitiesAdmin, getAllAttributesAdmin, getCategoriesAdmin } from "@/lib/services/global";
import { EditActivityForm } from "@/app/components/Pages/DASHBOARD/admin/_rsc_pages/activities/EditActivityForm";
import { getSingleActivityAdmin } from "@/lib/services/activites";
import { isEmpty } from "lodash";
import { notFound } from "next/navigation";
import { log } from "@/lib/utils";

// RSC default id 9
const EditActivity = async () => {
  const [tags, locations, attributes, categories] = await Promise.all([getAllTagsAdmin(), getAllCitiesAdmin(), getAllAttributesAdmin(), getCategoriesAdmin()]);

  const activitydata = await getSingleActivityAdmin(5); //dyanmic id

  if (isEmpty(activitydata)) {
    return notFound();
  }

  return <EditActivityForm tags={tags} locations={locations} /** locations == cities */ attributes={attributes} categories={categories} activitydata={activitydata} />;
};

export default EditActivity;
