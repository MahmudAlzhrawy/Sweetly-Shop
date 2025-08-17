"use client";
import { useUserManage } from "@/Context/UserManageContext";
import { useFormik } from "formik";
import { User, Lock } from "lucide-react";
import Link from "next/link";
import * as Yup from "yup";
export default function Login() {
    const login = useUserManage().login;
    const formik= useFormik({
        initialValues:{
            userName: "",
            password: ""
        },
        validationSchema:Yup.object().shape({
            userName: Yup.string()
                .required("Username is required")
                .min(3, "Username must be at least 3 characters long"),
            password: Yup.string()
                .required("Password is required")
                .min(6, "Password must be at least 6 characters long")
        }),
        onSubmit: (values) => {
            console.log("Form submitted with values:", values);
            login({
                userName: values.userName,
                password: values.password
            });
        }
        
    })
    return (
        <div className="flex flex-col  h-full">
        
<form onSubmit={formik.handleSubmit}>
  {/* Username Field */}
    <div className="relative mb-14">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B1654A]" size={20} />
        <input
        placeholder="Username"
        className=" pl-10" // نضيف padding لليسار
        id="userName"
        name="userName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.userName}
        />
        {formik.touched.userName && formik.errors.userName && (
        <div className="text-red-500 text-sm mt-1">{formik.errors.userName}</div>
        )}
    </div>

    {/* Password Field */}
    <div className="relative mb-14">
        <Lock className="absolute  left-3 top-1/2 -translate-y-1/2 text-[#B1654A]" size={20} />
        <input
        placeholder="Password"
        className=" pl-10"
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
        <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
        )}
    </div>
    <button type="submit" className="btn absolute  left-1/2 transform -translate-x-1/2  ">Login</button>
    </form>
    <div className="text-center  absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
        <p className="text-gray-900">You Don’t have account? <Link href={'/register'}  className="text-[#B1654A]">Sign up</Link></p>
    </div>
        </div>
    )
    
}