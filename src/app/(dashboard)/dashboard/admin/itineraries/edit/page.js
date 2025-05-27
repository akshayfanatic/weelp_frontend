export const dynamic = 'force-dynamic';

import React from "react";
import { getAllTagsAdmin, getAllCitiesAdmin, getAllAttributesAdmin, getCategoriesAdmin } from "@/lib/services/global";
import { EditItineraryForm } from "@/app/components/Pages/DASHBOARD/admin/_rsc_pages/itineraries/EditItineraryForm";
import { getSingleItineraryAdmin } from "@/lib/services/itineraries";
import { getAllTransfersAdmin } from "@/lib/services/transfers";
import { getAllActivitesAdmin } from "@/lib/services/activites";
import { isEmpty } from "lodash";
import { notFound } from "next/navigation";
import { log } from "@/lib/utils";

const EditItinerary = async () => {
  const [tags, locations, attributes, categories ,transfers,activites] = await Promise.all([
    getAllTagsAdmin(),
     getAllCitiesAdmin(),
      getAllAttributesAdmin(),
       getCategoriesAdmin(),
        getAllTransfersAdmin(),
        getAllActivitesAdmin()
      ]);

  const itinerarydata = await getSingleItineraryAdmin(9); //dyanmic id

  // check if not found
  if (isEmpty(itinerarydata)) {
    return notFound();
  }
  return  <EditItineraryForm tags={tags} locations={locations} attributes={attributes} categories={categories} alltransfers={transfers} allactivities={activites} itineraryData={itinerarydata}  />
};

export default EditItinerary;
