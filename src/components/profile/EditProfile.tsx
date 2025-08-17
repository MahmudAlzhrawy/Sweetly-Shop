"use client";
import { useUserManage } from "@/Context/UserManageContext";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";

// ✅ مخطط التحقق
const validationSchema = Yup.object({
firstName: Yup.string().required("First name is required"),
lastName: Yup.string().required("Last name is required"),
address: Yup.string().required("Address is required"),
});

export default function EditProfile({setShowEdit}:{setShowEdit:Dispatch<SetStateAction<boolean>>}) {
const { User, updateUser } = useUserManage();

const formik = useFormik({
initialValues: {
    firstName: User?.firstName ,
    lastName: User?.lastName,
    address: User?.address,
},
validationSchema,
onSubmit: (values) => {
    updateUser(User._id, values.firstName, values.lastName, values.address);
    console.log("Submitted:", values);
},
});

return (
<div className="flex flex-col  h-screen">
    <form
    className="p-6 my-auto rounded-lg shadow bg-white max-w-md mx-auto"
    onSubmit={formik.handleSubmit}
    >
    <h2 className="text-center text-2xl text-[#B1654A] font-bold mb-10 font-serif">
        Edit Profile
    </h2>

    {/* First Name */}
    <div className="mb-3">
        <label className="block text-sm text-gray-600">First Name</label>
        <input
        placeholder="Enter first name"
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#B1654A]"
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
        />
        {formik.errors.firstName && (
        <div className="text-red-500 text-sm mt-1">
            {formik.errors.firstName}
        </div>
        )}
    </div>

    {/* Last Name */}
    <div className="mb-3">
        <label className="block text-sm text-gray-600">Last Name</label>
        <input
        placeholder="Enter last name"
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#B1654A]"
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
        />
        {formik.errors.lastName && (
        <div className="text-red-500 text-sm mt-1">
            {formik.errors.lastName}
        </div>
        )}
    </div>

    {/* Address */}
    <div className="mb-3">
        <label className="block text-sm text-gray-600">Address</label>
        <textarea
        placeholder="Enter address"
        className="w-full border rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#B1654A]"
        id="address"
        name="address"
        onChange={formik.handleChange}
        value={formik.values.address}
        />
        {formik.errors.address && (
        <div className="text-red-500 text-sm mt-1">
            {formik.errors.address}
        </div>
        )}
    </div>

    {/* Submit */}
    <div className="flex justify-between">
    <button
        type="submit"
        className="bg-[#B1654A] hover:bg-[#8e4d36] text-white py-2 px-4 rounded w-full mt-4"
    >
        Save Changes
    </button>
    <button
        onClick={()=>{setShowEdit(false)}}
        className="bg-[#B1654A] hover:bg-[#8e4d36] text-white py-2 px-4 rounded w-full mt-4"
    >
        Cansel
    </button>
    </div>
    </form>
</div>
);
}
