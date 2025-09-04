import Cart from "@/components/products/Cart";
import { Metadata } from "next";
export const metadata:Metadata = {
    title: "Cart",
    description: "User shopping cart",
}
export default function CartPage(){
    return (

        <>
        <Cart/>
        </>
    )
}