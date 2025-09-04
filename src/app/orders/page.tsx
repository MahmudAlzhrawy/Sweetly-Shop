import Orders from "@/components/profile/Orders";
import { Metadata } from "next";
export const metadata:Metadata = {
    title: "Orders",
    description: "User orders page",
}
export default function OrderPage(){
    return (

        <>
        <Orders/>
        </>

    )
}