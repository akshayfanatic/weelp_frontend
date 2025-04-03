/** This File will handle Region Page */
import BannerSection from "@/app/components/Pages/FRONT_END/region/BannerSection";
import CitySection from "@/app/components/Pages/FRONT_END/Global/CitySection";
import { ReviewSectionRegion } from "@/app/components/Pages/FRONT_END/Global/ReviewSection";
import ShopSection from "@/app/components/Pages/FRONT_END/Global/ShopSection";
import DestinationSliderSection from "@/app/components/Pages/FRONT_END/Global/DestinationSection";
import { whiteCardData, fakeData } from "@/app/Data/ShopData";
import BreakSection from "@/app/components/BreakSection";
import { TourSection } from "@/app/components/Pages/FRONT_END/Global/TourSection";
import GuideSection from "@/app/components/Pages/FRONT_END/Global/GuideSection";
import { publicApi } from "@/lib/axiosInstance";
import { notFound } from "next/navigation";
import { log } from "console";
import { RegionFilter } from "@/app/components/Pages/FRONT_END/region/region_filter";

// Fetch Data Before Rendering Component
async function getCitiesByRegion(region) {
  try {
    const response = await publicApi.get(`/api/region/${region}/cities/`, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching city data:");

    return [];
  }
}

// getPackageDataByRegion
async function getPackageDataByRegion(region) {
  try {
    const response = await publicApi.get(`/api/region/${region}/region-packages`,
      {
        headers: { Accept: "application/json" },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error fetching city data:packages_city", error);
    return []; // Return null to trigger 404
  }
}

//  Region Page Component
export default async function Region({ params }) {
  const { region } = await params;

  // Fetch data before rendering
  const { data: cityData = [] } = await getCitiesByRegion(region);

  const { data: packageData = [], tag_list = [] } =
    await getPackageDataByRegion(region);

  // Handle 404 Not Found (Prevent Rendering)
  if (!cityData || cityData.length === 0) {
    return notFound();
  }

  // testing schema
  function schemaJsonSample() {
    return {
      __html: `{
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": "Executive Anvil",
      "image": [
        "https://example.com/photos/1x1/photo.jpg",
        "https://example.com/photos/4x3/photo.jpg",
        "https://example.com/photos/16x9/photo.jpg"
       ],
      "description": "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
      "sku": "0446310786",
      "mpn": "925872",
      "brand": {
        "@type": "Brand",
        "name": "ACME"
      },
      "review": {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "4",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Fred Benson"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.4",
        "reviewCount": "89"
      },
      "offers": {
        "@type": "Offer",
        "url": "https://example.com/anvil",
        "priceCurrency": "USD",
        "price": "119.99",
        "priceValidUntil": "2020-11-20",
        "itemCondition": "https://schema.org/UsedCondition",
        "availability": "https://schema.org/InStock"
      }
    }
  `,
    };
  }

  return (
    <>
      <BannerSection  />
      {/* <CitySection data={whiteCardData} /> */}

      {/* Show Section Only If Data Exists */}
      {cityData.length > 0 && (
        <DestinationSliderSection
          sliderTitle="Must Visit Cities"
          data={cityData}
        />
      )}

      <BreakSection />

      {packageData?.length > 0 && (
        <TourSection items={packageData} taglist={tag_list} />
      )}

      <BreakSection />
      
      {/* <ShopSection /> */}
      {/* Region Based Filter */}
      <RegionFilter/>

      <ReviewSectionRegion />
      <GuideSection sectionTitle="Blogs" data={fakeData} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={schemaJsonSample()}
        key="product-jsonld"
      />
    </>
  );
}
