"use client"

import Accordion from '@/app/components/Faq'
import React from 'react'
import { faqItems } from '@/app/Data/ShopData'
import { Check, X } from 'lucide-react'
import { SingleProductReview } from './SingleProductReview'

// OverView Panel
export const OverViewPanel = ({ triggered, panelTitle, panelContent }) => {
  return (
    <div className='flex flex-col gap-4 '>
      <h3 className='text-lg sm:text-[28px] font-medium text-Nileblue capitalize mb-2'>Overview</h3>
      <p className='text-base text-[#000000]'>Drive an all-terrain vehicle (ATV) at full throttle across the sands and enjoy an exciting program of other desert exploits in one fuss-free trip with this premium experience from Dubai. Hit the red dunes of the Lahbab desert, bump around a 60-minute ATV circuit, and relax Bedouin-style at the 5-star Al Khayma camp. Sip coffee, ride camels, and enjoy an Arabic-costume photoshoot, barbecue-buffet, dance
        shows, and stargazing before returning.</p>
      <ul className='flex flex-col pl-8'>
        <li className='text-base text-[#000000]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo, consequuntur?</li>
        <li className='text-base text-[#000000]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo, consequuntur?</li>
        <li className='text-base text-[#000000]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo, consequuntur?</li>
        <li className='text-base text-[#000000]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo, consequuntur?</li>
      </ul>
      <BreakSection />
    </div>
  )
}


// What's Included
export const WhatIncludedPanel = ({ triggered, panelTitle, panelContent }) => {
  const checklist = [
    {
      text: "Pick-up and drop off at your selected hotel/location by air-conditioned vehicle",
      included: true,
    },
    {
      text: "60-Minutes Quad Bike Ride at Red dunes open desert with Fuel & Helmet",
      included: true,
    },
    {
      text: "Accompanying Experienced instructor",
      included: true,
    },
    {
      text: "Dune bashing with a 4x4 car",
      included: false,
    },
    {
      text: "Tipping",
      included: false,
    },
    {
      text: "Any other expenses not mentioned",
      included: false,
    },
  ];

  return (
    <div className="py-2 flex flex-col">
      <h3 className="text-lg sm:text-[28px] font-medium text-Nileblue capitalize mb-2">
        {panelTitle?panelTitle:"What's Included"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Included Column */}
        <ul className='flex flex-col gap-4'>
          {checklist
            .filter((item) => item.included)
            .map((item, index) => (
              <li key={index} className="flex items-start gap-4 text-base">
                <Check className="size-[20px]" size={24} /> {item.text}
              </li>
            ))}
        </ul>

        {/* Excluded Column */}
        <ul className='flex flex-col gap-4'>
          {checklist
            .filter((item) => !item.included).map((item, index) => (
              <li key={index} className="flex items-start gap-4 text-base">
                <X className="size-[20px]" size={24} /> {item.text}
              </li>
            ))}
        </ul>
      </div>
      <BreakSection />
    </div>
  );
};



//  const ReviewPane
export const ReviewPanel = ({ triggered, panelTitle, panelContent }) => {
  return (
    <div>
      <SingleProductReview />
      <BreakSection />
    </div>
  )
}

//  const FAQ Panel
export const FaqPanel = ({ triggered, panelTitle, panelContent }) => {
  return (
    <div>
      <Accordion items={faqItems} />
    </div>
  )
}


// Single Product Form
import BreakSection from '@/app/components/BreakSection'
import SingleProductForm from '@/app/components/Form/SingleProductForm'


export const ProductForm = ({ price , productId }) => {
  
  const gradientStyle = {
    background: "linear-gradient(180deg, rgba(255,255,255,1) 5%, rgba(236,255,232,1) 100%)"
  }
  return (
    <div className='p-6 sm:p-12 sm:pe-32 bg-no-repeat bg-bottom bg-cover sm:sticky sm:top-12 sm:right-0'>
      <h3 className='text-Blueish font-bold text-xl sm:text-2xl capitalize'>From $6,790.18</h3>
      <BreakSection marginTop={"mt-9"} />
      <SingleProductForm productId={productId}/>

      <div className='flex gap-4 flex-wrap items-start sm:items-center sm:justify-between border p-6 rounded-xl'
        style={gradientStyle}
      >
        <div className='flex flex-col gap-2'>
          <h2 className='text-Blueish font-semibold capitalize text-lg'>Questions?</h2>
          <p className='text-base text-black text-wrap w-4/5'>Visit the Weelp Help Centre for any further questions.</p>
          <span className='sm:text-base mt-2 sm:mt-4'>Product ID : 451245</span>
        </div>
        <button className='p-4 font-medium text-xs sm:text-base capitalize border rounded-md h-fit w-fit text-black border-black'>Help Center</button>
      </div>

    </div>
  )
}