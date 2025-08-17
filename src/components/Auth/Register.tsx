"use client";
import { useFormik } from "formik";
import { User, Lock ,Mail ,LocationEdit } from "lucide-react";
import { useUserManage } from "@/Context/UserManageContext";
import Link from "next/link";
import * as Yup from "yup";
export default function Register() {
const register = useUserManage().register;
    const formik= useFormik({
        initialValues:{
            userName: "",
            password: "",
            lastName: "",
            firstName: "",
            email: "",
            address: "",
            confirmPassword: "",
            image:null

        },
        validationSchema:Yup.object().shape({
            userName: Yup.string()
                .required("Username is required")
                .min(3, "Username must be at least 3 characters long"),
            password: Yup.string()
                .required("Password is required")
                .min(6, "Password must be at least 6 characters long"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
            firstName: Yup.string()
                .required("First name is required")
                .min(2, "First name must be at least 2 characters long"),
            lastName: Yup.string()
                .required("Last name is required")
                .min(2, "Last name must be at least 2 characters long"),
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),
            address: Yup.string()
                .required("Address is required")
            .min(5, "Address must be at least 5 characters long"),
        }),
        onSubmit: (values) => {
        register({
            userName: values.userName,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            address: values.address,
            image: values.image
        });
    }
    })
    return (
    <div className="flex flex-col  h-full">
        
<form onSubmit={formik.handleSubmit}>
  {/* Username Field */}
    <div className="relative mb-3">
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
    {/* Name fields */}
    <div className="flex space-x-4 mb-3">
    {/* First Name Field */}
    <div className="relative ">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B1654A]" size={20} />
        <input
            placeholder="First Name"
            className=" pl-10"
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.firstName}</div>
        )}
    </div>
    {/* Last Name Field */}
    <div className="relative">
        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B1654A]" size={20} />
        <input
            placeholder="Last Name"
            className=" pl-10"
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.lastName}</div>
        )}
    </div>
    </div>
   
    {/* Email Field */}
    <div className="relative mb-3">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B1654A]" size={20} />
        <input
            placeholder="Email"
            className=" pl-10"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        )}
    </div>
    {/* Address Field */}
    <div className="relative mb-3">
        <LocationEdit className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B1654A]" size={20} />
        <input
            placeholder="Address"
            className=" pl-10"
            id="address"
            name="address"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
        />
        {formik.touched.address && formik.errors.address && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
        )}
    </div>
    {/* upload image */}
    <div className="relative mb-3">
        <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={(event) => {
                formik.setFieldValue("image", event.currentTarget.files?.[0]);
            }}
            onBlur={formik.handleBlur}
        />
        {formik.touched.image && formik.errors.image && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
        )}
    </div>  
    <div className="flex space-x-4 mb-3">
    {/* Password Field */}
    <div className="relative mb-3">
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
        {/* confirmPassword Field */}
        <div className="relative mb-3">
            <Lock className="absolute  left-3 top-1/2 -translate-y-1/2 text-[#B1654A]" size={20} />
            <input
                placeholder="Confirm Password"
                className=" pl-10"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
            )}
        </div>
    </div>
    <button type="submit" className="btn absolute  left-1/2 transform -translate-x-1/2  ">Sign Up</button>
    </form>
    <div className="text-center  absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4">
        <p className="text-gray-900">You have an account? <Link href={'/login'}  className="text-[#B1654A]">Sign In</Link></p>
    </div>
        </div>
    )
    
}