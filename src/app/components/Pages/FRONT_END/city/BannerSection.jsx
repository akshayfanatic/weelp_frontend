import axios from 'axios';
import React from 'react';
import GallerySlider from '@/app/components/sliders/GallerySlider';
import { fakeData } from '@/app/Data/ShopData';
import * as Icons from '../../../../../../public/assets/Icons/Icons';
import BreadCrumb from '@/app/components/BreadCrumb';



const BannerSection = ({ bannerTitle, bannerDescription }) => {
    
    return (
        <section className="flex lg:h-[60vh] py-6 relative page_city_banner" style={{ background: 'linear-gradient(to bottom, #FFFFFF, #EAF1EE)' }}>
            <div className="flex flex-col lg:flex-row container mx-auto gap-4 p-6">

                <div className="relative flex-1 w-full lg:w-1/3 py-4 ">
                    <h2 className="text-2xl font-medium text-[#143042] mb-4 capitalize">Things to do In</h2>
                    <h1 className='font-semibold text-5xl text-[#143042]  mb-4 capitalize'>{bannerTitle || "London"}</h1>
                    <p className="font-medium text-lg text-grayDark text-wrap">{bannerDescription || " You'll discover everything from whisky to Harry Potter, or even some bodysnatchers, in Scotland"}</p>

                    <BreadCrumb className={"absolute xl:top-[70%] -top-4"} />
                </div>

                <div className="w-full lg:w-2/3">
                    <GallerySlider data={fakeData} />
                </div>
            </div>

            <Icons.Vector2 className={"hidden lg:block absolute bottom-0 left-0 -translate-x-14 scale-125 rotate-45"} />
            <Icons.Vector2 className={"hidden lg:block absolute bottom-16 left-4 rotate-45 scale-[.2]"} />
        </section>
    );
}


export default BannerSection;
