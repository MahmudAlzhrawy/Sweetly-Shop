"use client"
import {HomeIcon,User ,Contact,Package} from "lucide-react"
import Link from "next/link";
import { usePathname  } from "next/navigation"
export default function Bar(){
    const pathname = usePathname();
   
    return(
        <>
        {
            pathname !=="/Cart"&&
            <div className="w-full h-16 bg-[#653524] flex  rounded-t-xl items-center justify-center">
                <ul className="flex w-full mx-10 justify-between items-center " >
                <Link href='/'><li className={`${pathname === '/' ?'text-white p-2 rounded-full border-white border mb-14 bg-[#653524] duration-500 ease-in-out' : 'text-white'} `}><HomeIcon /></li></Link>
                    <Link href='/products'><li className={`${pathname === '/products' ? 'text-white p-2 rounded-full border-white border mb-10 bg-[#653524] duration-500 ease-in-out' : 'text-white'} `}><Package/></li></Link>
                    <Link href='/contact'><li className={`${pathname === '/contact' ? 'text-white p-2 rounded-full border-white border mb-10 bg-[#653524] duration-500 ease-in-out' : 'text-white'} `}><Contact /></li></Link>
                    <Link href='/profile'><li className={`${pathname === '/profile' ? 'text-white p-2 rounded-full border-white border mb-10 bg-[#653524] duration-500 ease-in-out' : 'text-white'} `}><User /></li></Link>
                </ul>
            </div>
        }
        </>
    )
}