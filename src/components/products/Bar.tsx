"use client"
import { useUserManage } from "@/Context/UserManageContext";
import { Toast } from "@/sweetalert";
import {HomeIcon,User ,Contact,Package} from "lucide-react"
import Link from "next/link";
import { usePathname, useRouter  } from "next/navigation"
export default function Bar(){
    const pathname = usePathname();
    const{isLogin}=useUserManage()
    const router=useRouter();
    return(
        <>
        {
            pathname !=="/Cart"&&
            <div className="w-full h-16 bg-[#653524] flex  rounded-t-xl items-center justify-center">
                <ul className="flex w-full mx-10 justify-between items-center " >
                    <button 
                    onClick={()=>{
                    router.push('/')   
                    }}
                        
                    ><li className={`${pathname === '/' ?'text-white p-2 rounded-full border-white border mb-14 bg-[#653524] duration-500 ease-in-out' : 'text-white'} `}><HomeIcon /></li>
                    </button>
                    <button onClick={()=>
                        router.push("/products")
                    }
                    ><li className={`${pathname === '/products' ? 'text-white p-2 rounded-full border-white border mb-10 bg-[#653524] duration-500 ease-in-out' : 'text-white'} `}><Package/></li>
                    </button>
                    {/* <button
                    onClick={()=>{
                        router.push('/contact')
                    }}><li className={`${pathname === '/contact' ? 'text-white p-2 rounded-full border-white border mb-10 bg-[#653524] duration-500 ease-in-out' : 'text-white'} `}><Contact /></li>
                    </button> */}
                    <button onClick={()=>{
                        isLogin ==="true"?router.push('/profile'):(
                            Toast.fire({
                            icon: "warning",
                            title: "You Must Login First",
                            }),
                            router.push("/login")
                        )
                    }}><li className={`${pathname === '/profile' ? 'text-white p-2 rounded-full border-white border mb-10 bg-[#653524] duration-500 ease-in-out' : 'text-white'} `}><User /></li>
                    </button>
                </ul>
            </div>
        }
        </>
    )
}