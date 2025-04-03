import Link from 'next/link';
import React from 'react'
import { Heart, Eye } from 'lucide-react';

// Guide Card **
const Singleproductguide = ({ imageSrc, postTitle, subtitle }) => {
  const modifiedSubtitle = String(subtitle).slice(0, 30)
  return (
    <div className="max-w-full sm:max-w-sm  flex flex-col">
      <Link href={"/blogs/blog"} >
      <img
        src={imageSrc || "/assets/images/8597548-ai 1.jpg"}
        alt={"China"}
        className="object-cover w-full rounded-lg h-60"
      />
      <div className="text-white bg-white p-4 rounded-md">
        <h2 className="text-[16px] font-medium text-blackish">{postTitle || "Solo"}</h2>
        <p className="text-[20px] font-medium text-black">{modifiedSubtitle || "Best Places for Solo Travel"}</p>
      </div>
      </Link>
    </div>
  );
};

export default Singleproductguide


// Blog Card **
export const BlogCard = ({ imageSrc, blogTitle, blogDate }) => {
  return (
    <div className='"max-w-full sm:max-w-sm w-full flex flex-col'>
      <Link href={"/blogs/blog"}>
        <img alt='blog_logo' src={imageSrc ? imageSrc : "/assets/images/8597548-ai 1.jpg"} className='object-cover w-full rounded-lg h-60' />
        <div className="text-white py-4 rounded-md">
          <h2 className="text-[20px] font-semibold text-black">{blogTitle ? blogTitle : "Spend the night on the set of SEVENTEEN's latest music video"}</h2>
          <span className="text-sm uppercase tracking-widest text-blackish">{blogDate ? blogDate : "October 14, 2024"}</span>
        </div>
      </Link>
    </div>
  )
}


// component about Author Information information
export const BlogAuthorInfo = ({ authorName, authorImage, views, rating }) => {
  return (
    <div className='max-w-4xl mx-auto p-6 lg:px-6 '>
      <div className='flex justify-between flex-wrap gap-2'>
        <div className='flex gap-4'>
          <img alt="sitelogo" src={authorImage ? authorImage : "/assets/Card.png"}  className=' size-12 rounded-full' />
          <h3 className='capitalize text-base text-[#143042] font-bold'>{authorName ? authorName : "Jessica Jone"} <span className='flex flex-col font-medium text-[#5A5A5A] text-sm first-letter:capitalize'>Updated at 16 Oct</span></h3>
        </div>
        <div className='flex gap-4 '>
          <span className='text-[#5A5A5A] flex items-center gap-2'><Heart className=' size-4 text-[#FF8686] fill-[#FF8686]' />{rating ? rating + "k" : "3.4k"}</span>
          <span className='text-[#5A5A5A] flex items-center gap-2'><Eye className='size-4 text-[#5A5A5A]' />{views ? views : "23.4k"}</span>
        </div>
      </div>
    </div>
  )
}