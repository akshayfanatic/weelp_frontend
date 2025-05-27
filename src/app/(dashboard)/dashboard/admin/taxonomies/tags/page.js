export const dynamic = 'force-dynamic';

import { TagPage } from "@/app/components/Pages/DASHBOARD/admin/_rsc_pages/taxonomies/tags/tags";
import { getAllTagsAdmin } from "@/lib/services/global";
import { isEmpty } from "lodash";
import { notFound } from "next/navigation";

const TagsPage = async () => {
  let tags=[] = await getAllTagsAdmin();

  // send 404 if api failed
  if (isEmpty(tags)) {
    notFound();
  }
  return (
    <TagPage tags={tags} />
  );
};

export default TagsPage;
