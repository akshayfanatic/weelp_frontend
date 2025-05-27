export const dynamic = 'force-dynamic';
import React from "react";
import { getAllTagsAdmin, getAllCitiesAdmin, getAllAttributesAdmin, getCategoriesAdmin } from "@/lib/services/global";
import { getAllActivitesAdmin } from "@/lib/services/activites";
import { CreateItineraryForm } from "@/app/components/Pages/DASHBOARD/admin/_rsc_pages/itineraries/CreateItineraryForm";
import { getAllTransfersAdmin } from "@/lib/services/transfers";

const CreateItineriary = async () => {
  const [tags, locations, attributes, categories, activites, transfers] = await Promise.all([
    getAllTagsAdmin(),
    getAllCitiesAdmin(),
    getAllAttributesAdmin(),
    getCategoriesAdmin(),
    getAllActivitesAdmin(),
    getAllTransfersAdmin(),
  ]);

  return <CreateItineraryForm tags={tags} locations={locations} attributes={attributes} categories={categories} allactivities={activites} alltransfers={transfers} />;
};

export default CreateItineriary;
