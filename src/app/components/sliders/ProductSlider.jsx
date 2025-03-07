"use client"
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import SingleProductCard from '../SingleProductCard';
import { ProductCarouselAnimation } from '../Animation/ProductAnimation';


const ProductSlider = ({ data }) => {
  const [productData, setProductData] = useState([]);
  const [initialize, setInitialize] = useState(null);

  useEffect(() => {
    setProductData(data) // get array data from Api
    setInitialize(true)
  }, [])

  if (initialize) {
    return (
      <div>
        {/* <h2 className='text-[28px] font-medium text-Nileblue'>Top Activities</h2> */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation={true}
          loop={true}
          breakpoints={{
            450: {
              slidesPerView: 1,
              spaceBetween: 10
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 20
            }
          }}
          className=""
        >

          {productData && productData.map((product, index) => (

            <SwiperSlide key={index}>
              <SingleProductCard productId={product?.id} productTitle={product?.name} imgsrc={product?.image} productPrice={product?.price} productRating={product?.rating} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  } return <ProductCarouselAnimation />
};

export default ProductSlider;