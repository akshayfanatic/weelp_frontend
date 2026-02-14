export const dynamic = 'force-dynamic';

import React from 'react';
import { getSinglePackageAdmin } from '@/lib/queries/package';
import { isEmpty } from 'lodash';
import { notFound } from 'next/navigation';
import { EditPackageForm } from '@/app/components/Pages/DASHBOARD/admin/_rsc_pages/packages/EditPackageForm';
import { getAllAttributesAdmin, getAllCitiesAdmin, getAllTagsAdmin, getCategoriesAdmin } from '@/lib/queries/global';
import { getAllActivitesAdmin } from '@/lib/queries/activites';
import { getAllTransfersAdmin } from '@/lib/queries/transfers';
import { getAllItinerariesAdmin } from '@/lib/queries/itineraries';
import { log } from '@/lib/utils';

const EditPackage = async () => {
  const [{ data: tagsData }, { data: locationsData = {} }, { data: attributesData = {} }, { data: categoriesData = {} }, activites, transfers, itineraries] = await Promise.all([
    getAllTagsAdmin(),
    getAllCitiesAdmin(),
    getAllAttributesAdmin(),
    getCategoriesAdmin(),
    getAllActivitesAdmin(),
    getAllTransfersAdmin(),
    getAllItinerariesAdmin(),
  ]);

  const { data: categories = [] } = categoriesData; // categories
  const { data: locations = [] } = locationsData; // get cities
  const { data: attributes = [] } = attributesData; // for attributes

  const packagedata = await getSinglePackageAdmin(5); //dyanmic id

  // check if not found
  if (isEmpty(packagedata)) {
    return notFound();
  }

  const { data: tags = [] } = tagsData; // for tags

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
