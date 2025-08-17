import Register from "@/components/Auth/Register";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen  bg-[#A05034]">
            <div className="w-full absolute bottom-0 flex flex-col h-[78vh]  p-4 rounded-t-3xl  bg-[#FDF9F5]">
            <h1 className=" header-tex ">Sign Up</h1>
            <Register/>
            <img src="/assets/images/donatschekolate.png"  alt="Description" className="mt-4 w-[130px] h-[182px] absolute -top-32 right-3" />
            </div>
        </div>
    );
}
