"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SingleProductCard, {
  SingleProductCardItinerary,
  SingleProductCardPackage,
} from "../SingleProductCard";
import { ProductCarouselAnimation } from "../Animation/ProductAnimation";
import { usePathname } from "next/navigation";
import { log } from "@/lib/utils";
import { GlobalCard } from "../SingleProductCard";

const ProductSlider = ({ data }) => {
  const [productData, setProductData] = useState([]);
  const [initialize, setInitialize] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    setProductData(data); // get array data from Api
    setInitialize(true);
  }, []);

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
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          
          className=""
        >
          {productData.map((product, index) => (
            <SwiperSlide key={index}>
              <GlobalCard 
                productId={product?.id}
                productTitle={product?.name}
                productSlug={product?.slug}
                item_type={product?.item_type}
                productPrice={product?.pricing?.regular_price ?? product?.base_pricing?.variations[0]?.regular_price}
                productRating={product?.rating}
                productCity={String(product?.locations[0]?.city).toLowerCase()}
                productRegion={String(
                  product?.locations[0]?.region
                ).toLowerCase()}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
  return <ProductCarouselAnimation />;
};
export default ProductSlider;

// // itinerary slider
// export const ProductSliderItinerary = ({ data }) => {
//   const [productData, setProductData] = useState([]);
//   const [initialize, setInitialize] = useState(null);

//   useEffect(() => {
//     setProductData(data); // get array data from Api
//     setInitialize(true);
//   }, []);

//   if (initialize) {
//     return (
//       <div>
//         {/* <h2 className='text-[28px] font-medium text-Nileblue'>Top Activities</h2> */}
//         <Swiper
//           modules={[Navigation]}
//           spaceBetween={20}
//           navigation={true}
//           loop={true}
//           breakpoints={{
//             450: {
//               slidesPerView: 1,
//               spaceBetween: 10,
//             },
//             640: {
//               slidesPerView: 2,
//               spaceBetween: 15,
//             },
//             768: {
//               slidesPerView: 3,
//               spaceBetween: 15,
//             },
//             1024: {
//               slidesPerView: 4,
//               spaceBetween: 20,
//             },
//             1440: {
//               slidesPerView: 5,
//               spaceBetween: 20,
//             },
//           }}
//           className=""
//         >
//           {productData &&
//             productData.map((product, index) => (
//               <SwiperSlide key={index}>
//                 <SingleProductCardItinerary
//                   productId={product?.id}
//                   productTitle={product?.name}
//                   productSlug={product?.slug}
//                   imgsrc={product?.image}
//                   productPrice={
//                     product?.base_pricing?.variations.at(0)?.regular_price
//                   }
//                   productRating={product?.rating}
//                 />
//               </SwiperSlide>
//             ))}
//         </Swiper>
//       </div>
//     );
//   }
//   return <ProductCarouselAnimation />;
// };

// // package slider
// export const ProductSliderPackage = ({ data }) => {
//   const [productData, setProductData] = useState([]);
//   const [initialize, setInitialize] = useState(null);

//   useEffect(() => {
//     setProductData(data); // get array data from Api
//     setInitialize(true);
//   }, []);

//   if (initialize) {
//     return (
//       <div>
//         {/* <h2 className='text-[28px] font-medium text-Nileblue'>Top Activities</h2> */}
//         <Swiper
//           modules={[Navigation]}
//           spaceBetween={20}
//           navigation={true}
//           loop={true}
//           breakpoints={{
//             450: {
//               slidesPerView: 1,
//               spaceBetween: 10,
//             },
//             640: {
//               slidesPerView: 2,
//               spaceBetween: 15,
//             },
//             768: {
//               slidesPerView: 3,
//               spaceBetween: 15,
//             },
//             1024: {
//               slidesPerView: 4,
//               spaceBetween: 20,
//             },
//             1440: {
//               slidesPerView: 5,
//               spaceBetween: 20,
//             },
//           }}
//           className=""
//         >
//           {productData &&
//             productData.map((product, index) => (
//               <SwiperSlide key={index}>
//                 <SingleProductCardPackage
//                   productId={product?.id}
//                   productTitle={product?.name}
//                   productSlug={product?.slug}
//                   imgsrc={product?.image}
//                   productPrice={
//                     product?.base_pricing?.at(0).variations.at(0)
//                       ?.regular_price || ""
//                   }
//                   productRating={product?.rating}
//                 />
//               </SwiperSlide>
//             ))}
//         </Swiper>
//       </div>
//     );
//   }
//   return <ProductCarouselAnimation />;
// };
