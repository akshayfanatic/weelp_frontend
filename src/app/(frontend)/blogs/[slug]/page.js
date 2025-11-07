import React from 'react';
import BannerSectionBlog from '@/app/components/Pages/FRONT_END/singleblog/BannerSection';
import ContentSection from '@/app/components/Pages/FRONT_END/singleblog/ContentSection';
import GuideSection from '@/app/components/Pages/FRONT_END/Global/GuideSection';
import { fakeData } from '@/app/Data/ShopData';

export async function generateMetadata() {
  return {
    title: 'Single Blog Page',
    description: 'Description of the Single Blog',
  };
}
const SingleBlogPage = async ({ params }) => {
  const { slug } = await params;

  return (
    <>
      <BannerSectionBlog />
      <ContentSection />
      <GuideSection sectionTitle={'Recommended'} data={fakeData} />
    </>
  );
};

export default SingleBlogPage;
