"use client"

// Sorting Functionality
import React, { useState } from 'react'
import { fakeData } from '@/app/Data/ShopData';
import { ListFilter, Map, X } from 'lucide-react';
import { BlogCard } from '@/app/components/singleproductguide';

const BlogFilterBar = () => {

    const [showsort, setShowSort] = useState(null);
    const [sortData, setSortData] = useState("");
    const [selectedFilters, setSelectedFilters] = useState([]); // State for selected filters
    const [visibleCount, setVisibleCount] = useState(4);


    // Handle Filter Change
    const handleFilterChange = (location) => {
        setSelectedFilters((prevFilters) => {
            if (prevFilters.includes(location)) {
                // Remove filter if it exists (toggle functionality)
                return prevFilters.filter((filter) => filter !== location);
            } else {
                // Add filter if it does not exist
                return [...prevFilters, location];
            }
        });
    };

    // Filter Data Based on Selected Filters
    const filteredData = selectedFilters.length > 0
        ? fakeData.filter((item) => selectedFilters.includes(item.location))
        : fakeData;

    // Sorting Display Handle
    const handleSort = (e) => {
        e.preventDefault();
        setShowSort(!showsort);
    };

    // Handle Sort Value
    const handleSortValue = (e) => {
        const sortValue = e.target.getAttribute('value');
        setSortData(sortValue);
        setShowSort(!showsort);

        if (sortValue === '5') {
            // Sort by Popularity (Assuming popularity is based on `rating`)
            filteredData.sort((a, b) => b.rating - a.rating);
        } else if (sortValue === '5000') {
            // Sort by Price: Low to High
            filteredData.sort((a, b) => a.price - b.price);
        } else if (sortValue === '200') {
            // Sort by Price: High to Low
            filteredData.sort((a, b) => b.price - a.price);
        }
    };

    // handle Show MOre
    const handleShowMore = (prevCount) => {
        return setVisibleCount((prevCount) => prevCount + 4)
    }
    return (
        <div className='flex flex-col gap-8 mt-4'>
            {/* Sort Bar */}
            <form className='flex flex-wrap gap-4 sm:justify-between justify-end'>

                <div className='hidden sm:block'>
                    <ul className='flex gap-4 flex-wrap'>
                        {fakeData && fakeData.map((val, index) => {
                            if (index > 4) {
                                return null;
                            }
                            return (
                                <label
                                    htmlFor={val?.location}
                                    key={index}
                                    className={`flex items-center gap-2 cursor-pointer capitalize  text-grayDark font-medium text-md py-2 px-4 rounded-lg border w-fit ${selectedFilters.includes(val?.location) ? 'bg-gray-300' : 'bg-[#eff3f6]'}`}
                                >
                                    <input
                                        type="checkbox"
                                        id={val?.location}
                                        className="peer hidden"
                                        onChange={() => handleFilterChange(val?.location)} // Handle filter change
                                        checked={selectedFilters.includes(val?.location)} // Checkbox is checked if filter exists in state
                                    />
                                    {val?.location}
                                </label>
                            )
                        })}
                    </ul>
                </div>

                <div className='relative'>
                    <div className='flex gap-4 flex-wrap'>
                        <button
                            className='flex items-center gap-4 text-grayDark border text-base p-2 px-6  rounded-lg'
                            onClick={(e) => e.preventDefault()}
                        >
                            View on map<Map size={18} />
                        </button>
                        <button
                            className='flex items-center gap-4 text-grayDark border text-base p-2 px-6  rounded-lg'
                            onClick={handleSort}
                        >
                            Sort <ListFilter size={18} />
                        </button>
                    </div>
                    {
                        showsort &&
                        <div onMouseLeave={(e) => { e.stopPropagation(), setShowSort(!showsort) }}>
                            <input type='hidden' value={sortData} />
                            <ul className='absolute z-10 mt-4 left-24 border flex flex-col bg-white rounded-md text-sm'>
                                <li className='cursor-pointer ease-in-out duration-200 p-4 capitalize hover:bg-[#f2f7f5] text-nowrap  text-grayDark' onClick={handleSortValue} value={"5"}>Sort By Popularity</li>
                                <li className='cursor-pointer ease-in-out duration-200 p-4 capitalize hover:bg-[#f2f7f5] text-nowrap  text-grayDark' onClick={handleSortValue} value={5000}>Sort By Price: low to high</li>
                                <li className='cursor-pointer ease-in-out duration-200 p-4 capitalize hover:bg-[#f2f7f5] text-nowrap  text-grayDark' onClick={handleSortValue} value={200}>Sort By Price : High to Low</li>
                            </ul>
                        </div>
                    }
                </div>
            </form>


            {/* Result */}
            <ul className='grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16'>
                {filteredData && filteredData.slice(0, visibleCount).map((val, index) => {
                    return (
                        <li key={index}>
                            <BlogCard
                                imageSrc={val?.image}
                                blogTitle={val?.name}
                                blogDate={""}//date not mentioned in my fakedata
                            />
                        </li>
                    )
                })}
            </ul>

            {/* Read More Button */}
            {visibleCount < filteredData.length && (
                <div className='flex justify-center'>
                    <button onClick={handleShowMore} className='bg-secondaryDark hover:bg-[#ffffff] text-[#ffffff] hover:text-secondaryDark border border-secondaryDark  text-base font-medium rounded-md w-fit py-2 px-6'>View More</button>
                </div>
            )}

        </div>
    )
}

export default BlogFilterBar
