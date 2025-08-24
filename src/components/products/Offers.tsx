'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { useProductsAndOrders } from '@/Context/Products&OrdersManageContext';
import Card from '@/UI/Card';
import Loading from '@/app/loading';
import Image from 'next/image';

export default function Offers() {
    const { products = [], isLoading, error } = useProductsAndOrders();

    if (isLoading) {
        return <div><Loading /></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const offers = products?.filter((product) => product.type === 'Offer') || [];

    return (
        <div className="offers-section h-32 px-4 py-2">
            <Swiper
                slidesPerView={1}
                centeredSlides={true}
                grabCursor={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet custom-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active',
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper w-full max-w-md mx-auto"
            >
                {offers.length > 0 ? (
                    offers.map((offer, index) => (
                        <SwiperSlide key={index} className="flex items-center justify-center">
                            <Card className=" w-[75%] mx-auto flex justify-between relative overflow-hidden rounded-lg shadow-md">
                                {/* شارة الخصم */}
                                <span className="absolute top-2 left-2 bg-[#FF6B6B] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                                Discount up to  50%
                                </span>

                                {/* صورة + النصوص جنب بعض */}
                                <div className="flex flex-row w-full justify-between mx-2 items-center p-4">
                                    {/* النصوص */}
                                    <div className="ml-4 text-left">
                                        <p className="text-lg font-semibold">{offer.name}</p>
                                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                                            {offer.description}
                                        </p>
                                    </div>
                                    {/* الصورة */}
                                    <Image
                                        src={offer.image}
                                        className="w-28 h-full rounded-full object-contain flex-shrink-0"
                                        alt={offer.name}
                                        width={112}
                                        height={1}
                                    />
                                </div>
                            </Card>
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide className="flex items-center justify-center">
                        <Card>
                            <div className="flex flex-col justify-center items-center h-full p-4 text-center">
                                <p className="text-lg font-semibold mt-4">
                                    No special offers available at the moment.
                                </p>
                            </div>
                        </Card>
                    </SwiperSlide>
                )}
            </Swiper>

            {/* تنسيقات النقط */}
            <style jsx global>{`
                .custom-bullet {
                    background-color:#a07263;
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
