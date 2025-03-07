/** This File Will Handle Destination Page (Single Product) */
import BannerSection from "@/app/components/Pages/FRONT_END/singleproduct/BannerSection";
import TabSection from "@/app/components/Pages/FRONT_END/singleproduct/TabSection";

export default async function DestinationPage({ params }) {
    const { destination } = await params;
    return (
        <>
            {/* <Link href={"/continent"}>Dynamic Destination: {destination}</Link > */}
            <BannerSection />
            <TabSection productId={1} />
        </>
    )
}