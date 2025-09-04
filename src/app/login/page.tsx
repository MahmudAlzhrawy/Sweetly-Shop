import Login from "@/components/Auth/Login";
import { Metadata } from "next";
import Image from "next/image";
export const metadata:Metadata = {
    title: "Login",
    description: "User login page",
};
export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen  bg-[#A05034]">
            <div className="w-full fixed items-center bottom-0 flex flex-col h-[70vh]  px-4 rounded-t-3xl  bg-[#FDF9F5]">
            <Image height={160} width={130} src="/assets/images/donatschekolate.png"  alt="Description" className="mt-4 absolute -top-32 right-3" />
            <h1 className=" header-tex ">Login</h1>
            <Login />            
            </div>
        </div>
    );
}
