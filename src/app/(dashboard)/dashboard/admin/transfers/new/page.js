export const dynamic = 'force-dynamic';
import { getAllTagsAdmin, getAllCitiesAdmin, getAllAttributesAdmin, getCategoriesAdmin } from "@/lib/services/global";
import { CreateTransferForm } from '@/app/components/Pages/DASHBOARD/admin/_rsc_pages/transfers/CreateTransferForm';


// RSC
const CreateTransfer = async () => {
  const [{ data: tagsData }, { data: locationsData = {} },{  data: attributesData = {} }, {data: categoriesData = {} }] = await Promise.all([getAllTagsAdmin(), getAllCitiesAdmin(), getAllAttributesAdmin(), getCategoriesAdmin()]);

  const { data:tags = [] } = tagsData; // for tags
  const { data: locations = [] } = locationsData; // get cities
  const { data: categories = [] } = categoriesData; // categories
  const { data: attributes = [] } = attributesData; // for attributes
  

  
  return <CreateTransferForm tags={tags} locations={locations} /** locations == cities */ attributes={attributes} categories={categories} />;
};

export default CreateTransfer;