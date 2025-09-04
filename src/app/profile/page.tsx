import Homeprof from "@/components/profile/Home";
import { Metadata } from "next";
export const metadata:Metadata = {
    title: "Profile",
    description: "User profile page",
};
export default function Profile(){
    return(
    <div className="h-screen bg-[#653524]">
     <Homeprof/>
    </div>
    )
}