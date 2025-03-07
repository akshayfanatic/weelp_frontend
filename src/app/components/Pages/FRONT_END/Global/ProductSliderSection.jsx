import React from 'react'
import ProductSlider from '../../../sliders/ProductSlider'
import { fakeData } from '@/app/Data/ShopData'

const ProductSliderSection = ({ sliderTitle ,destinations }) => {
    return (
        <section className='container mx-auto flex flex-col gap-3 p-4 sm:my-8 productSlider'>
            <h2 className='text-lg sm:text-[28px] font-medium text-Nileblue top-4 capitalize'>{sliderTitle || "Top activities"}</h2>
            <ProductSlider data={destinations ?? fakeData} />
        </section>
    )
}

export default ProductSliderSection