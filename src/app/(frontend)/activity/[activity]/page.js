/** This File Will Handle Destination Page (Single Product) */
import BannerSection from "@/app/components/Pages/FRONT_END/singleproduct/BannerSection";
import  { TabSectionActivity } from "@/app/components/Pages/FRONT_END/singleproduct/TabSection";
import { publicApi } from "@/lib/axiosInstance";
import { log } from "@/lib/utils";
import { notFound } from "next/navigation";


// fetch City Data
async function getActivityData(activity) {
  try {
    const response = await publicApi.get(`/api/activities/${activity}`, {
      headers: { Accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    return []; 
  }

}

export default async function DestinationPage({ params }) {
  const { activity } = await params;

  const {data:activityData=[]} = await getActivityData(activity);

  
  // if activity not found
  if (activityData.length === 0) {
    notFound();
  }
  
  const { id, name ,pricing:{regular_price}  } = activityData;
  return (
    <>
      <BannerSection activityName={name} />
      <TabSectionActivity productId={id}  productData={activityData}/>
    </>
  );
}
