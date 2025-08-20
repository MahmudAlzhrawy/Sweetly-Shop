import Link from "next/link";
import NavImage from "./NavImage";
import Swipper from "./Swipper";

export default function Main() {
    return(
      <main className="flex relative min-h-screen flex-col items-center justify-between p-24 bg-[#FDF9F5]">
        <NavImage/>
        <div className="swiper absolute top-0 left-0 w-full h-full">
          <Swipper/>
        </div>
        <Link href={"/login"} className="font-medium text-[#B86F55]">Next</Link>
    </main>

    )
}