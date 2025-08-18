    "use client"
    import { useUserManage } from "@/Context/UserManageContext"
    import Image from "next/image"
    import { useState } from "react"
    import { Edit, ShoppingBasket ,LogOut ,DiamondPlus } from "lucide-react"
    import EditProfile from "./EditProfile" // الفورم اللي كتبناه قبل
import Link from "next/link"

    export default function Homeprof(){
    const {User,userRole} = useUserManage()
    const [showEdit, setShowEdit] = useState(false)

    return(
    <div className="div fixed w-full bottom-0 h-[80vh] bg-[#fffefe] rounded-t-[12%]">
        <div className="content flex flex-col justify-center items-center">
            <Image
                src={User.image}
                alt="Profile"
                width={150}
                height={150}
                loading="lazy"
                className="rounded-full absolute -top-20"
            />
            <div className="name-email text-center mt-28 flex flex-col">
                <h1 className="text-[#331A12] text-4xl font-bold font-serif">{User.userName}</h1>
                <p className="text-[#6D6161] text-lg">{User.email}</p>
            </div>
            <div className="pages gap-4 mt-14 w-[70%] flex flex-col justify-center items-center">
                {
                    userRole === "admin" &&
                    <Link  href={"/Add"}
                        className="flex rounded-md shadow shadow-[#331A12] text-[#331A12] text-2xl justify-evenly bg-[#FBECE0] p-4 w-full"
                    >
                        <DiamondPlus/> Add Product
                    </Link>
                }
                <button 
                    onClick={()=>setShowEdit(true)} 
                    className="flex rounded-md shadow shadow-[#331A12] text-[#331A12] text-2xl justify-evenly bg-[#FBECE0] p-4 w-full"
                >
                    <Edit /> Edit Profile
                </button>
                <Link href={'/orders'} className="flex rounded-md shadow shadow-[#331A12] text-[#331A12] text-2xl justify-evenly bg-[#FBECE0] p-4 w-full">
                    <ShoppingBasket/> Orders
                </Link>
                <Link href="/register" className="flex rounded-md shadow shadow-[#331A12] text-[#331A12] text-2xl justify-evenly bg-[#FBECE0] p-4 w-full">
                    <LogOut/> Logout
                </Link>
            </div>
        </div>

        {/* ✅ Modal */}
        {showEdit && (
            <div className="fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm z-50">
                <div className=" w-[90%] md:w-1/2 p-6 rounded-lg shadow-lg relative">
                    {/* زر الإغلاق */}
                    <button 
                        onClick={()=>setShowEdit(false)} 
                        className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                    >
                        ✕
                    </button>
                    {/* الفورم */}
                    <EditProfile setShowEdit={setShowEdit}/>
                </div>
            </div>
        )}
    </div>
    )
    }
