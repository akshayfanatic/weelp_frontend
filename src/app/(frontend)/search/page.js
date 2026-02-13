// 'use client';
import React from 'react';
import BannerSection from '@/app/components/Pages/FRONT_END/shop/BannerSection';
import { SearchPage } from '@/app/components/Pages/FRONT_END/shop/SearchPage';

const Search = async ({ searchParams }) => {
  const searchParms = await searchParams;
  return (
    <>
      <BannerSection />
      <SearchPage />
    </>
  );
};

export default Search;
