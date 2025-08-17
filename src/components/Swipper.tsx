"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cube';
import { Autoplay, EffectCube, Pagination } from 'swiper/modules';

export default function Swipper() {
  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <Swiper
        effect={'cube'}
        grabCursor={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        cubeEffect={{
          shadow: false,
          slideShadows: false,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={{ clickable: true,
            bulletClass: 'swiper-pagination-bullet custom-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active'
         }}
        modules={[Autoplay, EffectCube, Pagination]}
        className="mySwiper  mx-auto h-[400px] sm:h-[450px]"
      >
        <SwiperSlide className="flex items-center justify-center">
          <div className="flex flex-col justify-center items-center h-full p-4 text-center">
            <img src="/assets/images/dunatss.png" className="w-full h-auto max-h-60 object-contain" />
            <p className="text-lg font-semibold mt-4">
              Welcome to <span className="text-primary">Sweetly!</span>
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center h-full p-4 text-center">
            <img src="/assets/images/crazecake.png" className="w-full h-auto max-h-60 object-contain" />
            <p className="text-lg font-semibold mt-4">
              <span className="text-primary">Order</span> The Most Delicious Desserts
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col justify-center items-center h-full p-4 text-center">
            <img src="/assets/images/man.png" className="w-full h-auto max-h-60 object-contain" />
            <p className="text-lg font-semibold mt-4">
              Fast And Easy <span className="text-primary">delivery</span>
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
      <style jsx global>{`
                .custom-bullet {
                    background-color: #a07263;
                    height: 15px;
                    width: 15px;
                    opacity: 1;
                }
                .custom-bullet-active {
                    background-color: #653524 !important;
                    width: 40px;
                    height: 10px;
                }
                .swiper-pagination {
                    bottom: 5px !important;
                }
            `}</style>
    </div>
  );
}
