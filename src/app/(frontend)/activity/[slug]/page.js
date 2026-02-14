/** This File Will Handle Destination Page (Single Product) */

import BannerSection from '@/app/components/Pages/FRONT_END/singleproduct/BannerSection';
import { TabSectionActivity } from '@/app/components/Pages/FRONT_END/singleproduct/TabSection';
import { notFound } from 'next/navigation';
import { getSingleActivity } from '@/lib/queries/activites';
import { isEmpty } from 'lodash';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const { data: activityData = [] } = await getSingleActivity(slug);

  const { name, description } = activityData;

  return {
    title: name || '',
    description: description || '',
  };
}

export default async function SingleActivityPage({ params }) {
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
    media_gallery,
  } = activityData;

  // const jsonLd = {
  //   '@context': 'https://schema.org',
  //   '@type': item_type,
  //   name: name,
  //   description: description,
  // };
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: 'Desert Safari Adventure',
    description: 'Experience the thrill of a desert safari with dune bashing and camel rides.',
    touristType: 'Adventure Travelers',
    provider: {
      '@type': 'Organization',
      name: 'Your Company Name',
    },
  };

  return (
    <>
      <BannerSection activityName={name} media_gallery={media_gallery} />
      <TabSectionActivity productId={id} productData={activityData} />

      {/* Add JSON-LD to your page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* <Script type="application/ld+json" strategy='beforeInteractive' dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}} /> */}
    </>
  );
}
