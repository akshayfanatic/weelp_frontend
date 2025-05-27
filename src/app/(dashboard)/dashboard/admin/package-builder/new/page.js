export const dynamic = 'force-dynamic';

import React from "react";
import { CreatePackageForm } from "@/app/components/Pages/DASHBOARD/admin/_rsc_pages/packages/CreatePackageForm";
import { getAllTagsAdmin, getAllCitiesAdmin, getAllAttributesAdmin, getCategoriesAdmin } from "@/lib/services/global";
import { getAllActivitesAdmin } from "@/lib/services/activites";
import { getAllTransfersAdmin } from "@/lib/services/transfers";
import { getAllItinerariesAdmin } from "@/lib/services/itineraries";

const CreatePackage = async () => {
  const [tags, locations, attributes, categories, activites, transfers ,itineraries ] = await Promise.all([
    getAllTagsAdmin(),
    getAllCitiesAdmin(),
    getAllAttributesAdmin(),
    getCategoriesAdmin(),
    getAllActivitesAdmin(),
    getAllTransfersAdmin(),
    getAllItinerariesAdmin()
  ]);
  return <CreatePackageForm tags={tags} locations={locations} attributes={attributes} categories={categories} allactivities={activites} alltransfers={transfers} itineraries={itineraries} />;
};

export default CreatePackage;
