import Login from "@/components/Auth/Login";

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen  bg-[#A05034]">
            <div className="w-full absolute bottom-0 flex flex-col h-[70vh]  p-4 rounded-t-3xl  bg-[#FDF9F5]">
            <h1 className=" header-tex ">Login</h1>
            <Login />
            <img src="/assets/images/donatschekolate.png"  alt="Description" className="mt-4 w-[130px] h-[182px] absolute -top-32 right-3" />
            </div>
        </div>
    );
}
