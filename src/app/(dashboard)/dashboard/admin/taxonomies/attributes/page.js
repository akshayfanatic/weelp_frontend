export const dynamic = 'force-dynamic';

import { AttributePage } from "@/app/components/Pages/DASHBOARD/admin/_rsc_pages/taxonomies/attributes/attributes";
import { getAllAttributesAdmin } from "@/lib/services/global";
import { isEmpty } from "lodash";
import { notFound } from "next/navigation";

const AttributesPage = async () => {
  const attributes = await getAllAttributesAdmin();


  if (isEmpty(attributes)) {
    notFound()
  }
  return <AttributePage attributes={attributes} />;
};

export default AttributesPage;
