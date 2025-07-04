/** This File Will Handle Destination Page (Single Product) */

import BannerSection from "@/app/components/Pages/FRONT_END/singleproduct/BannerSection";
import { TabSectionActivity } from "@/app/components/Pages/FRONT_END/singleproduct/TabSection";
import { notFound } from "next/navigation";
import { getSingleActivity } from "@/lib/services/activites";
import { isEmpty } from "lodash";
import { publicApi } from "@/lib/axiosInstance";
import { log } from "@/lib/utils";

export default async function DestinationPage({ params }) {
  const { slug } = await params;

  const { data: activityData = [] } = await getSingleActivity(slug);

  // if activity not found
  if (isEmpty(activityData)) {
    notFound();
  }

  const {
    id,
    name,
    description,
    item_type,
    pricing: { regular_price },
  } = activityData;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": item_type,
    name: name,
    description: description,
  };

  return (
    <>
      <BannerSection activityName={name} />
      <TabSectionActivity productId={id} productData={activityData} />

      {/* Add JSON-LD to your page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
