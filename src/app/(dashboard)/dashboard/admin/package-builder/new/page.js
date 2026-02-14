export const dynamic = 'force-dynamic';

import React from 'react';
import { CreatePackageForm } from '@/app/components/Pages/DASHBOARD/admin/_rsc_pages/packages/CreatePackageForm';
import { getAllTagsAdmin, getAllCitiesAdmin, getAllAttributesAdmin, getCategoriesAdmin } from '@/lib/queries/global';
import { getAllActivitesAdmin } from '@/lib/queries/activites';
import { getAllTransfersAdmin } from '@/lib/queries/transfers';
import { getAllItinerariesAdmin } from '@/lib/queries/itineraries';

const CreatePackage = async () => {
  const [{ data: tagsData }, { data: locationsData = {} }, { data: attributesData = {} }, { data: categoriesData = {} }, { data: activitiesData = [] }, transfers, itineraries] = await Promise.all([
    getAllTagsAdmin(),
    getAllCitiesAdmin(),
    getAllAttributesAdmin(),
    getCategoriesAdmin(),
    getAllActivitesAdmin(),
    getAllTransfersAdmin(),
    getAllItinerariesAdmin(),
  ]);

  const { data: tags = [] } = tagsData; // for tags
  const { data: locations = [] } = locationsData; // get cities
  const { data: categories = [] } = categoriesData; // categories
  const { data: attributes = [] } = attributesData; // for attributes

  return <CreatePackageForm tags={tags} locations={locations} attributes={attributes} categories={categories} allactivities={activitiesData} alltransfers={transfers} itineraries={itineraries} />;
};

export default CreatePackage;
