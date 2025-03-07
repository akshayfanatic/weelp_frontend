/** This File Will Handle City Page */
import BannerSection from "@/app/components/Pages/FRONT_END/city/BannerSection";
import CitySection from "@/app/components/Pages/FRONT_END/Global/CitySection";
import { whiteCardData, fakeData } from "@/app/Data/ShopData";
import BreakSection from "@/app/components/BreakSection";
import TourSection from "@/app/components/Pages/FRONT_END/Global/TourSection";
import ShopSection from "@/app/components/Pages/FRONT_END/Global/ShopSection";
import ReviewSection from "@/app/components/Pages/FRONT_END/Global/ReviewSection";
import GuideSection from "@/app/components/Pages/FRONT_END/Global/GuideSection";
import ProductSliderSection from "@/app/components/Pages/FRONT_END/Global/ProductSliderSection";
import { publicApi } from "@/lib/axiosInstance";
import { notFound } from "next/navigation";

// fetch City Data
async function getCityData(region, city) {
  try {
    const response = await publicApi.get(`/api/${region}/${city}`, {
      headers: { Accept: "application/json" },
    });

    return response.data;
  } catch (error) {
    console.log("Error fetching city data:", error);
    return []; // Return null to trigger 404
  }
}




export default async function CityPage({ params }) {
  const { city, region } = await params;

  const destinationData = await getCityData(region, city);

  // If city not found, show the 404 page
  if (destinationData.length === 0) {
    notFound();
  }

  return (
    <>
      <BannerSection bannerTitle={city} />
      <CitySection data={whiteCardData} />
      <ProductSliderSection
        sliderTitle={"Top Activities"}
        destinations={destinationData}
      />
      <BreakSection />
      <TourSection />
      <BreakSection />
      <ShopSection />
      <ReviewSection />
      <GuideSection sectionTitle={"Blogs"} data={fakeData} />
    </>
  );
}
