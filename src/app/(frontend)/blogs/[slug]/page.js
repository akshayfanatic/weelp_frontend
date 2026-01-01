'use client';
import React, { useEffect, useState } from 'react';
import BannerSectionBlog from '@/app/components/Pages/FRONT_END/singleblog/BannerSection';
import ContentSection from '@/app/components/Pages/FRONT_END/singleblog/ContentSection';
import GuideSection from '@/app/components/Pages/FRONT_END/Global/GuideSection';
import { fakeData } from '@/app/Data/ShopData';

// export async function generateMetadata() {
//   return {
//     title: 'Single Blog Page',
//     description: 'Description of the Single Blog',
//   };
// }
const SingleBlogPage = () => {
  const [postData, setPostData] = useState({});

  useEffect(() => {
    // Initialize state from localStorage
    const data = localStorage.getItem('blogdata');
    if (data) setPostData(JSON.parse(data));

    // Listen for changes in localStorage (from other tabs)
    const handleStorageChange = (event) => {
      console.log(event);
      if (event.key === 'blogdata') {
        setPostData(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };

    window.addEventListener('storage', handleStorageChange); // listen to storage

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // console.log(postData?.content)
  return (
    <>
      <BannerSectionBlog {...postData} />
      <ContentSection content={postData?.content || ""} />
      <GuideSection sectionTitle={'Recommended'} data={fakeData} />
    </>
  );
};

export default SingleBlogPage;
