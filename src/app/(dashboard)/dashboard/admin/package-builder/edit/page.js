export const dynamic = 'force-dynamic';

import React from "react";
import { getSinglePackageAdmin } from "@/lib/services/package";
import { isEmpty } from "lodash";
import { notFound } from "next/navigation";
import { EditPackageForm } from "@/app/components/Pages/DASHBOARD/admin/_rsc_pages/packages/EditPackageForm";
import { getAllAttributesAdmin, getAllCitiesAdmin, getAllTagsAdmin, getCategoriesAdmin } from "@/lib/services/global";
import { getAllActivitesAdmin } from "@/lib/services/activites";
import { getAllTransfersAdmin } from "@/lib/services/transfers";
import { getAllItinerariesAdmin } from "@/lib/services/itineraries";
import { log } from "@/lib/utils";

const EditPackage = async () => {
  const [tags, locations, attributes, categories, activites, transfers, itineraries] = await Promise.all([
    getAllTagsAdmin(),
    getAllCitiesAdmin(),
    getAllAttributesAdmin(),
    getCategoriesAdmin(),
    getAllActivitesAdmin(),
    getAllTransfersAdmin(),
    getAllItinerariesAdmin(),
  ]);

  const packagedata = await getSinglePackageAdmin(9); //dyanmic id

  // check if not found
  if (isEmpty(packagedata)) {
    return notFound();
  }

  return (
    <EditPackageForm
      tags={tags}
      locations={locations}
      attributes={attributes}
      categories={categories}
      allactivities={activites}
      alltransfers={transfers}
      itineraries={itineraries}
      packageData={packagedata}
    />
  );
};

export default EditPackage;
