"use client";
import { useProductsAndOrders } from "@/Context/Products&OrdersManageContext";
import { useUserManage } from "@/Context/UserManageContext";
import { ArrowBigLeft, MinusCircle, PlusCircle, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useCallback, useEffect } from "react";

export default function Cart() {
const router = useRouter();
const { userId } = useUserManage();
const { cart, addOrder,updateProductQuantity,deleteFromCart } = useProductsAndOrders();

// فلترة الكارت للمستخدم الحالي مرة واحدة فقط لما cart أو userId يتغير
const filteredCart = useMemo(() => {
return cart;
}, [cart, userId]);

const totPrice = useMemo(() => {
return filteredCart.items.reduce(
    (acc, item) => acc + item.product?.price * (item.quantity ?? 1),
    0
);
}, [filteredCart]);

// ثبّت دوال التعامل مع الكارت
const handleDecrease = useCallback(
(id: string) => updateProductQuantity(userId, id, "DECREMENT"),
[updateProductQuantity, userId]
);
const handleIncrease = useCallback(
(id: string) => updateProductQuantity(userId, id, "INCREMENT"),
[updateProductQuantity, userId]
);
const handleDeleteElement = useCallback(
(id: string) => deleteFromCart(userId,id),
[deleteFromCart, userId]
);
const handleClear = useCallback(
(id: string) => deleteFromCart(userId,id),
[deleteFromCart, userId]
);
const handleCheckout = useCallback(() => {
addOrder(userId, filteredCart);
handleClear("ALL");
}, [addOrder, userId, filteredCart]);

// تتبع الريندرات
useEffect(() => {
console.log("Cart Rendered");
});

return (
<div className="bg-[#FDF9F5] h-screen">
    {/* Nav */}
    <nav className="bg-[#653524] sticky w-full top-0 h-32 rounded-b-3xl px-4">
    <div className="flex justify-between items-center sticky top-16">
        <div className="flex justify-between gap-4 text-[#FDF9F5] items-center ">
        <ArrowBigLeft
            onClick={() => {
            router.push("/products");
            }}
            size={20}
        />
        <p className="text-2xl ">Cart</p>
        </div>
        <div className="text-[#FDF9F5]">
        <Trash2Icon onClick={() => handleClear("ALL")} size={30} />
        </div>
    </div>
    </nav>

    {/* Cart Items */}
    <section className="items mt-8 mb-10 overflow-scroll h-[40vh]">
    {filteredCart.items.map(({_id, product, quantity}) => {
    
        return (
        <div
            key={_id}
            className="flex bg-[#FBECE0] text-[#653524] h-32 w-[94%] rounded-xl mx-auto mb-12 "
        >
            <Image
            loading="lazy"
            className="rounded-full mr-6"
            src={product?.image}
            alt="not Found"
            width={100}
            height={100}
            />
            <div className="flex flex-col items-center justify-center w-14 h-full ml-4">
            <h1 className="text-2xl font-serif font-bold">{product?.name}</h1>
            <p className="text-2xl font-mono font-extrabold">
                {product?.price * quantity!}$
            </p>
            </div>
            <div className="quan flex items-center ml-8 ">
            <button onClick={() => handleDecrease(product?._id)}>
                <MinusCircle
                size={24}
                className="rounded-full text-white bg-[#634135]"
                />
            </button>
            <span className="mx-2 ">{quantity ?? 0}</span>
            <button onClick={() => handleIncrease(product._id)}>
                <PlusCircle
                size={24}
                className="text-[#B86F55] rounded-full bg-[#FDF9F5]"
                />
            </button>
            <button
                className="ml-1 bg-[#f7e2d2] rounded-full p-2"
                onClick={() => handleDeleteElement(product._id)}
            >
                <Trash2Icon
                size={20}
                className="rounded-full text-[#B86F55]"
                />
            </button>
            </div>
        </div>
        );
    })}
    </section>

    {/* Total */}
    <div className="details w-[95%] left-1/2 -translate-x-1/2 p-4 fixed bottom-4 rounded-lg shadow ord flex flex-col bg-[#FBECE0]">
    <div className="flex justify-between mr-6 items-center mb-4">
        <p className="totPrice">subTotal</p>
        <p>{totPrice} $</p>
    </div>
    <hr className="bg-[rgb(51,26,18)] inline-block" />
    <div className="flex justify-between items-center mr-6 my-2">
        <p className="totPrice">DeliveryFee</p>
        <p>20 $</p>
    </div>
    <hr className="bg-[#331A12] h-0.5 w-full" />
    <div className="flex justify-between items-center mt-2 mr-6">
        <p className="totPrice text-[#331A12]">Total</p>
        <p className="text-[#331A12]">{20 + totPrice} $</p>
    </div>
    <button
        onClick={handleCheckout}
        className="btn w-full mx-auto mt-10"
    >
        Check Out
    </button>
    </div>
</div>
);
}


