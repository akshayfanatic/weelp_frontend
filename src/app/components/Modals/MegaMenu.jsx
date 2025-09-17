import React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetchers';

import { useRegions } from '@/hooks/api/public/region/region';
import { DestinationCard2 } from '../DestinationCard';

const MegaMenu = ({ setShowMegaMenu, showmegaMenu }) => {
  const [selectedContinent, setSelectedContinent] = useState({
    name: '',
    slug: '',
  });
  const { data, isLoading: isRegionLoading, error: isRegionError } = useRegions(); // fetch region through api

  if (isRegionError) return <span className="text-red-400">Someting went wrong</span>;
  if (isRegionLoading) return <span className="loader"></span>;

  const regions = data?.data || [];

  // Handle continent selection
  const handleContinent = (name, slug) => {
    setSelectedContinent((prev) => {
      return { ...prev, name, slug };
    });
  };

  return (
    <div
      onMouseLeave={(e) => {
        (e.stopPropagation(), setShowMegaMenu(!showmegaMenu));
      }}
      className={`absolute z-20 bg-white text-black top-16 w-[768px] h-fit rounded-lg border flex`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Left Section: List of Continents */}
      <ul className="flex flex-1 flex-col justify-between h-full pb-8">
        {regions.map(({ name, slug }, index) => (
          <li
            key={index}
            className={`hover:bg-secondaryLight2 text-grayDark hover:text-secondaryDark p-4 capitalize flex items-center gap-2 ${
              selectedContinent.name === name ? 'bg-secondaryLight2 text-secondaryDark' : '' ? 'bg-secondaryLight2 text-secondaryDark' : ''
            }`}
            onClick={() => handleContinent(name, slug)}
          >
            {name}
          </li>
        ))}
      </ul>

      {/* Right Section: Dynamic Content */}
      <div className="border-l flex-[2] pb-8">
        <MegaMenuContent selectedContinent={selectedContinent?.slug} />
      </div>
    </div>
  );
};
export default MegaMenu;

// Dynamic Mega Menu Content
const MegaMenuContent = ({ selectedContinent = '' }) => {
  const { data: cityData, isLoading: isCityLoading, error: cityError } = useSWR(selectedContinent ? `/api/public/region/${selectedContinent}/getcities/` : null, fetcher);

  if (cityError) return <span className="text-red-400">Something Went Wrong</span>;
  if (isCityLoading) return <span className="loader"></span>;

  const citiesList = cityData?.data || [];

  return (
    <div className="flex flex-col h-full">
      {selectedContinent && (
        <>
          <div className="grid grid-cols-3 gap-4 items-center border-b p-4">
            {/* Dynamically render destination cards based on selected continent */}
            <DestinationCard2 />
            <DestinationCard2 />
            <DestinationCard2 />
          </div>
          <div className="mt-4">
            <CityList citiesList={citiesList} />
          </div>
        </>
      )}
    </div>
  );
};

const CityList = ({ citiesList = [] }) => {
  return (
    <ul className="grid grid-cols-4">
      {citiesList.map(({ slug, name }) => (
        <li key={slug} className="p-4 text-[#5A5A5A] text-sm">
          <Link href={`/city/${slug}`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
};
