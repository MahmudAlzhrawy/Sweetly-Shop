"use client"
import { useProductsAndOrders } from "@/Context/Products&OrdersManageContext";
import { useUserManage } from "@/Context/UserManageContext";
import { Search, ShoppingBasketIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
export default function HeadersAndSearchFiled() {
    const router =useRouter();
    const{setFilter,cart}=useProductsAndOrders()
    const{userId,isLogin}=useUserManage()
   const cartLen = useMemo(() => {

  return cart.items?.length;
}, [cart]);

return (
<div className="headers-and-search flex justify-center items-center bg-[#653524] h-[150px] w-full rounded-b-xl px-6">
    {/* حقل البحث مع أيقونة */}
    <div className="flex items-center justify-center bg-[#FEF4F0] rounded-lg px-3  w-4/5">
    <Search className="text-gray-500 mr-2" size={20} />
    <input
        onChange={(e)=>{setFilter(e.target.value)}}
        type="text"
        placeholder="Search for products..."
        className="flex-1 outline-none border-transparent bg-transparent"
    />
    </div>

    {/* أيقونة الكارت على اليمين */}
    <div onClick={()=>router.push("/Cart")} className="bg-[#FEF4F0] relative rounded-full w-12 h-12 flex items-center justify-center ml-4 cursor-pointer">
    <ShoppingBasketIcon  className="text-gray-700" size={22} />
    <p className=" text-[white] bg-red-500 px-2  absolute -top-2 rounded-full -right-2 ">{isLogin === "true"? cartLen : 0 }</p>
    </div>
</div>
);
}
