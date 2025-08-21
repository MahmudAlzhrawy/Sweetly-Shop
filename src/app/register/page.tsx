import Register from "@/components/Auth/Register";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#A05034]">
            <div className="w-full items-center  fixed bottom-0 flex flex-col h-[75vh]  px-4 rounded-t-3xl  bg-[#FDF9F5]">
            <Image height={160} width={130} src="/assets/images/donatschekolate.png"  alt="Description" className="mt-4  absolute -top-32 right-3" />
            <h1 className=" header-tex ">Sign Up</h1>
            <Register/>
            <p className="text-gray-900 mt-16">You have an account? <Link href={'/login'}  className="text-[#B1654A]">Sign In</Link></p> 
            </div>
        </div>
    );
}   