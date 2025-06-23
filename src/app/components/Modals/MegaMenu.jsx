import React, { useEffect } from "react";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { DestinationCard2 } from "../DestinationCard";
import Link from "next/link";

const MegaMenu = ({ setShowMegaMenu, showmegaMenu }) => {
  const [selectedContinent, setSelectedContinent] = useState(null);
  const allContinents = ["East Asia", "South East Asia", "Europe", "North America"];

  // Handle continent selection
  const handleContinent = (e) => {
    const continent = e.target.textContent;
    if (continent !== selectedContinent) {
      setSelectedContinent(continent);
    }
  };
  return (
    <div
      onMouseLeave={(e) => {
        e.stopPropagation(), setShowMegaMenu(!showmegaMenu);
      }}
      className={`absolute z-20 bg-white text-black top-16 w-[768px] h-fit rounded-lg border flex`}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Left Section: List of Continents */}
      <ul className="flex flex-1 flex-col justify-between h-full pb-8">
        <li className="hover:bg-secondaryLight2 text-grayDark hover:text-secondaryDark p-4 capitalize flex items-center gap-2">
          Trending Destination <ChevronRight size={18} />
        </li>
        {allContinents.map((continent, index) => (
          <li
            key={index}
            className={`hover:bg-secondaryLight2 text-grayDark hover:text-secondaryDark p-4 capitalize flex items-center gap-2 ${
              selectedContinent === continent ? "bg-secondaryLight2 text-secondaryDark" : ""
            }`}
            onClick={handleContinent}
          >
            {continent}
          </li>
        ))}
      </ul>

      {/* Right Section: Dynamic Content */}
      <div className="border-l flex-[2] pb-8">
        <MegaMenuContent selectedContinent={selectedContinent} />
      </div>
    </div>
  );
};
export default MegaMenu;

// Dynamic Mega Menu Content
const MegaMenuContent = ({ selectedContinent }) => {
  // selected content fetch data
  useEffect(() => {
    console.log("content fetch with fetch api");
  }, [selectedContinent]);

  return (
    <div className="flex flex-col h-full">
      <div className="grid grid-cols-3 gap-4 items-center border-b p-4">
        {/* Dynamically render destination cards based on selected continent */}
        <DestinationCard2 />
        <DestinationCard2 />
        <DestinationCard2 />
      </div>
      <div className="mt-4">
        {/* Dynamics Destination Links  */}
        <ul className="grid grid-cols-4">
          {Array.from({ length: 12 }).map((_, index) => {
            return (
              <li key={index} className="p-4 text-[#5A5A5A] text-sm">
                <Link href="/region/europe/city/london/destination/stpark">{selectedContinent}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
