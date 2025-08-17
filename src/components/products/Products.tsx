"use client";
import { useEffect, useState } from "react";
import HeadersAndSearchFiled from "./HeaderandSerach";
import dynamic from 'next/dynamic';
import Image from "next/image";
import Loading from "@/app/loading";
import { useProductsAndOrders } from "@/Context/Products&OrdersManageContext";
import { useRouter } from "next/navigation";

const Offers = dynamic(() => import('./Offers'), { ssr: false, loading: () => <Loading/> });
const MainProducts = dynamic(() => import('./MainProducts'), { ssr: false });
const ProductDetails = dynamic(() => import('./Product'), { ssr: false });

export default function Products() {
    const [role, setRole] = useState<string>('');
    const{setCategoryFilter}=useProductsAndOrders()
    const router =useRouter()
    const categories =[
        { id: 1, name: 'Cakes',image: 'assets/images/torta.png' },
        { id: 2, name: 'Pastries', image: 'assets/images/bancacke.png' },
        { id: 3, name: 'Cookies', image: 'assets/images/Cookies.png' },
        { id: 4, name: 'Breads', image: 'assets/images/bancakes.jpg' },
        { id: 5, name: 'Desserts', image: 'assets/images/stroperycake.jpg' },
    ]
    useEffect(() => {
        const getrole = localStorage.getItem("sweetyRole");
        if (getrole) {
            setRole(getrole);
        } else {
            console.log("No role found in localStorage");
        }
    }, []);

    return (
        <div className="main bg-[#FDF9F5] flex flex-col min-h-screen">
            {/* header and search field */}
            <section className="w-full sticky top-0 z-50">
                <HeadersAndSearchFiled />
            </section>

            {/* offers */}
            <section className=" offers mt-0">
                <div className="flex justify-between px-4">
                    <h1 className="text-lg text-[#331A12] font-bold mt-2 ">Special Offers</h1>
                    <h1 className="text-sm text-[#331A12] font-bold mt-2">See All</h1>
                </div>
                <div className="flex  h-[140px] overflow-x-hidden  justify-center px-2">
                    <Offers />
                </div>
            </section>
            <section className="categories ">
                <div className="flex justify-between items-center px-4">
                    <h1 className="text-lg text-[#331A12] font-bold my-4">Categories</h1>
                    <h4 className="text-[#331A12] font-medium" onClick={()=>setCategoryFilter("")}>See All</h4>
                </div>
                <div className="flex  justify-center w-full">
                    {categories.map((category) => (
                        <div onClick={()=>setCategoryFilter(category.name)} key={category.id} className="m-2 flex flex-col rounded-2xl justify-center items-center w-full bg-[#F9E6D6A8]">
                            <Image 
                            width={56}
                            height={56}
                            src={`/${category.image}`} 
                            alt={category.name} 
                            className="w-14 h-14 rounded-full bg-transparent   object-cover" 
                            loading="lazy"
                            ></Image>
                            <h2 className="text-center text-sm text-[#a07263] font-bold">{category.name}</h2>
                        </div>
                    ))}
                </div>
            </section>
            <section className="  products">
                <MainProducts/>
            </section>

            {/* add product button */}
            <div className="w-full fixed bottom-20 right-2 z-50 flex justify-end p-4">
                {role === 'admin' && (
                    <button
                        onClick={() => {router.push("/Add")}}
                        className="bg-[#FF6B6B] text-white py-2 px-4 rounded"
                    >
                        Add Product
                    </button>
                )}
            </div>
                <div className="overflow-x-hidden">
                    <ProductDetails/>
                </div>
            {/* footer */}
            <div className="w-full h-20 bg-[#FDF9F5] flex items-center justify-center">
                <p className="text-gray-500">© 2023 Sweety. All rights reserved.</p>
            </div>
        </div>
    );
}
