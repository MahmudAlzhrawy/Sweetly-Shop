'use client'
import Loading from "@/app/loading";
import { useProductsAndOrders } from "@/Context/Products&OrdersManageContext";
import { useUserManage } from "@/Context/UserManageContext";
import { Toast } from "@/sweetalert";
import { AddCartItem } from "@/utils/typs/typs";
import { X ,PlusCircle ,MinusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function ProductDetails() {
  const router =useRouter()
  const{isLogin}=useUserManage()
  const
   {
    products,
    productID, 
    isOpenDetailes, 
    setOpenDetailes ,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    cart
    }
  = useProductsAndOrders();
  const filteredProduct =useMemo(()=>{
      return products.find((p) => p._id === productID);
  },[products,isOpenDetailes]) 
  const filtredItem= useMemo(()=>{
    return cart.find((item)=>item.id===productID);
  },[cart])
  const[sweetlyId,setID]=useState<string>('')
  
  useEffect(()=>{
    const id = localStorage.getItem("sweetyId");
    id && setID(id);
  },[])
  const handleDecrease = useCallback(
(id: string) => decreaseQuantity(id),
[decreaseQuantity]
);
const handleIncrease = useCallback(
  (id: string) => increaseQuantity(id),
  [increaseQuantity]
);
const handleAddToCart=useCallback(
  (cartItem:AddCartItem)=>addToCart(cartItem)
  
  ,[])
  if (!isOpenDetailes) return null; // ❌ مش موجودة أساسًا إلا لما تتفتح  
  return (
    <div
      className={`
        rounded-t-[30%]
        fixed bottom-0 left-0 w-full 
        bg-[#FDF9F5] shadow-lg
        transform transition-transform duration-500 ease-in-out
        translate-y-0
      `}
      style={{ height: "55vh" }}
    >
      {/* زر الإغلاق */}
      <div className="flex justify-center w-12 h-12 rounded-full p-2 bg-[#e6cdb4]">
        <button onClick={() => setOpenDetailes(false)}>
          <X size={24} className="text-[#331A12]" />
        </button>
      </div>

      {/* محتوى المنتج */}
      {filteredProduct ? (
        <div className=" relative px-4 items-center">
            <Image
              width={128}
              height={128}
              src={`${filteredProduct.image}`}
                alt={filteredProduct.name}
                className="w-32 absolute left-1/2 -translate-x-1/2 -top-36 h-32 object-cover rounded-full mb-4"
                loading="lazy"
            ></Image>
        <div className="content mt-2 px-4">
          <h2 className="text-2xl  font-serif font-bold text-[#331A12]">{filteredProduct.name}</h2>
          <p className="text-[#331A12] mt-2">Description : {filteredProduct.description}</p>
          <div className="flex flex-col mt-12">
          <div className="price&quantity flex bg-[#FBECE0] rounded-xl h-1/2  p-4 justify-between mb-2">
           <div className="price flex flex-col">
            <h1 className="text-[#4b2214]">Price</h1>
            <p className="text-[#462113] text-xl font-serif font-bold">${filteredProduct.price *( filtredItem?.quantity??1)}</p>
           </div>
           <div className="quantity items-center justify-between flex">
               <button onClick={()=>{handleIncrease(filteredProduct._id)}}>
                   <PlusCircle size={24} className=" text-[#B86F55] rounded-full bg-[#FDF9F5]" />
               </button>
               <span className="mx-2">{(filtredItem?.quantity)?filtredItem?.quantity:0}</span>
               <button onClick={()=>{handleDecrease(filteredProduct._id)}}>
                   <MinusCircle size={24} className=" rounded-full text-white bg-[#634135]" />
               </button>
           </div>
          </div>
          <div className="addtocart">
            <button onClick={()=>{
              isLogin==="true"?
              handleAddToCart({
                name:filteredProduct.name, 
                type:filteredProduct.type,
                price:filteredProduct.price,
                image:filteredProduct.image,
                description:filteredProduct.description,
                id:filteredProduct._id,
                userId:sweetlyId
              }):(
                Toast.fire({
                icon: "warning",
                title: "You Must Login First",
                }),
                router.push("/login")
              )
            }} className="bg-[#653524] text-white py-2 px-4 font-serif text-xl rounded-lg w-full">
              Add To Cart
                </button>
          </div>
          </div>
            </div>
                
        </div>
      ) : (
       <Loading/>
      )}
    </div>
  );
}
