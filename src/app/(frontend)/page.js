import HereSection from "../components/Pages/FRONT_END/home/HeroSection";
import ProductSliderSection from "../components/Pages/FRONT_END/Global/ProductSliderSection";
import DestinationSliderSection from "../components/Pages/FRONT_END/Global/DestinationSection";
import { fakeData } from "../Data/ShopData";

// ReusableComponents
import SingleProductCard from "../components/SingleProductCard";
import TabButton from "../components/TabButton";
import BuyNow from "../components/BuyNow";
import BookingCard from "../components/BookingCard";
import Testimonial from "../components/Testimonial";
import DestinationCard, { DestinationCard2 } from "../components/DestinationCard";
import TestimonialSection from "../components/Pages/FRONT_END/Global/TestimonialSection";
import GuideSection from "../components/Pages/FRONT_END/Global/GuideSection";
import CurateSection from "../components/Pages/FRONT_END/home/CurateSection";
import ReviewCard, { ReviewCard2, SingleProductReviewCard } from "../components/ReviewCard";
import AiSection from "../components/Pages/FRONT_END/home/AiSection";
import { publicApi } from "@/lib/axiosInstance";
import { log } from "@/lib/utils";

/**
 * Returns all Featured Activities
 * @returns []
 */
async function getAllFeaturedActivities() {
  try {
    const response = await publicApi.get(`/api/activities/featured-activities`, {
      headers: { Accept: "application/json" },
    });

    return response.data;
  } catch (error) {
    console.log("Error fetching city data:", error);
    return [];
  }
}

/**
 * Get All Featured Cities
 * @returns []
 */
async function getAllFeaturedCities() {
  try {
    const response = await publicApi.get(`/api/featured-cities`, {
      headers: { Accept: "application/json" },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching city data:", error);
    return [];
  }
}

const HomePage = async () => {
  const { data: featuredActivities = [], success } = await getAllFeaturedActivities(); // featured Activities
  const { data: featuredCities } = await getAllFeaturedCities(); // featured cities
  return (
    <>
      <HereSection />
      {featuredActivities?.length > 0 && <ProductSliderSection destinations={featuredActivities} />}
      {featuredCities?.length > 0 && <DestinationSliderSection sliderTitle={"Top Destination"} data={featuredCities} />}
      <TestimonialSection />
      <CurateSection />
      <AiSection />
      <GuideSection sectionTitle={"Your Guide"} data={fakeData} /> {/* <RegistrationForm /> */}
      {/* Guide Section (Blog) */}
      <div className="hidden sm:grid-cols-2 md:grid-cols-3 p-5 gap-4 items-center max-w-fit">
        <SingleProductCard />
        <TabButton text={"For you"} />
        <BuyNow text={"Buy now"} />
        <BookingCard destination={"Desert Place"} />
        {/* <Testimonial
          username={""}
          email={""}
          title={""}
          imageSrc={""}
          date={""}
        />
        <ReviewCard
          title={"Markus_K"}
          rating={4}
          comment={
            "Very well and good organized trip to the Desert West Quads, Falcon Show, Camelriding and Delicious Barbecue."
          }
        />  
        <DestinationCard /> */}
      </div>
    </>
  );
};

export default HomePage;
