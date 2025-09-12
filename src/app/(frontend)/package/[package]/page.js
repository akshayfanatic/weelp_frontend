import React from 'react';
import { log } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { publicApi } from '@/lib/axiosInstance';
import BannerSection from '@/app/components/Pages/FRONT_END/singleproduct/BannerSection';
import { TabSectionIterenary, TabSectionPackage } from '@/app/components/Pages/FRONT_END/singleproduct/TabSection';

// Fetch package data
async function getPackageData(packagee) {
  try {
    const response = await publicApi.get(`/api/packages/${packagee}`, {
      headers: { Accept: 'application/json' },
    });

    return response.data;
  } catch (error) {
    return []; // Return null instead of an empty array for clarity
  }
}

export default async function PackagePage({ params }) {
  const { package: pack } = await params;
  const { data: packageData = [] } = await getPackageData(pack);

  // Check if packageData is null or empty
  if (!packageData || packageData.length === 0) {
    notFound();
  }
  const { name } = packageData;

  return (
    <>
      <BannerSection activityName={name} />
      <TabSectionPackage productData={packageData} />
    </>
  );
}
