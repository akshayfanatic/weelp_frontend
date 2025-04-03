/** This File Will Handle Destination Page (Single Product) */
import BannerSection from "@/app/components/Pages/FRONT_END/singleproduct/BannerSection";
import TabSection, {
  TabSectionIterenary,
} from "@/app/components/Pages/FRONT_END/singleproduct/TabSection";
import { publicApi } from "@/lib/axiosInstance";
import { log } from "@/lib/utils";
import { notFound } from "next/navigation";



// fetch City Data
async function getIterenaryData(iterenary) {
  try {
    const response = await publicApi.get(`/api/itineraries/${iterenary}`, {
      headers: { Accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    return []; // Return null to trigger 404
  }
}


export default async function IterenaryPage({ params }) {
  const { itinerary } = await params;

  const iterenaryData = await getIterenaryData(itinerary);

  // if activity not found
  if (iterenaryData.length === 0) {
    notFound();
  }

  const { data, id } = iterenaryData;
  const { name , seo } = data; //data 

  return (
    <>
      <BannerSection activityName={name} />
      <TabSectionIterenary productData={data} />
    </>
  );
}
