'use client';
import { useProductsAndOrders } from "@/Context/Products&OrdersManageContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Tag, FileText, DollarSign, Image as ImageIcon, Grid, Layers } from "lucide-react";

export default function AddProductsForm() {
    const addProduct = useProductsAndOrders().addProduct;

    const formik = useFormik({
        initialValues: {
            productName: '',
            description: '',
            price: '',
            category: '',
            image: null,
            type: '',
        },
        validationSchema: Yup.object({
            productName: Yup.string().required("Product name is required"),
            description: Yup.string().required("Description is required"),
            price: Yup.number().required("Price is required").positive("Price must be positive"),
            category: Yup.string().required("Category is required"),
            image: Yup.mixed().required("Image is required"),
            type: Yup.string().oneOf(["Product", "Offer"], "Invalid type").required("Type is required")
        }),
        onSubmit: (values,{resetForm}) => {
            addProduct({
                name: values.productName,
                description: values.description,
                price: parseInt(values.price),
                category: values.category,
                image: values.image!,
                type: values.type,
            });
            resetForm();
        },
        
    });

    return (
        <div className="flex flex-col bg-[#ece5e2]  h-screen">
            <form className="p-4 my-auto rounded-lg shadow  " onSubmit={formik.handleSubmit}>
                <h2 className="text-center text-2xl text-[#B1654A] font-bold mb-10 font-serif">Add New Product</h2>
                {/* Product Name */}
                <div className="relative mb-3">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B1654A]" size={20} />
                    <input
                        placeholder="Product Name"
                        className="pl-10 w-full border rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-[#B1654A]"
                        id="productName"
                        name="productName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.productName}
                    />
                    {formik.errors.productName && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.productName}</div>
                    )}
                </div>

                {/* Description */}
                <div className="relative mb-3">
                    <FileText className="absolute left-3 top-3 text-[#B1654A]" size={20} />
                    <textarea
                        placeholder="Description"
                        className="pl-10 w-full border rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-[#B1654A]"
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    {formik.errors.description && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
                    )}
                </div>

                {/* Price */}
                <div className="relative mb-3">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B1654A]" size={20} />
                    <input
                        placeholder="Price"
                        className="pl-10 w-full border rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-[#B1654A]"
                        id="price"
                        name="price"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    />
                    {formik.errors.price && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.price}</div>
                    )}
                </div>

                {/* Category */}
                <div className="relative mb-3">
                    <Grid className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B1654A]" size={20} />
                    <select
                        className="pl-10 w-full border rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-[#B1654A]"
                        id="category"
                        name="category"
                        onChange={formik.handleChange}
                        value={formik.values.category}
                    >
                        <option value="">Select a category</option>
                        <option value="Cakes">Cakes</option>
                        <option value="Pastries">Pastries</option>
                        <option value="Cookies">Cookies</option>
                        <option value="Breads">Breads</option>
                        <option value="Desserts">Desserts</option>
                    </select>
                    {formik.errors.category && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div>
                    )}
                </div>

                {/* Image Upload */}
                <div className="relative mb-3">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B1654A]" size={20} />
                    <input
                        className="pl-10 w-full border rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-[#B1654A]"
                        id="image"
                        name="image"
                        type="file"
                        onChange={(event) => {
                            formik.setFieldValue("image", event.currentTarget.files?.[0]);
                        }}
                    />
                    {formik.errors.image && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
                    )}
                </div>

                {/* Type */}
                <div className="relative mb-3">
                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B1654A]" size={20} />
                    <select
                        className="pl-10 w-full border rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-[#B1654A]"
                        id="type"
                        name="type"
                        onChange={formik.handleChange}
                        value={formik.values.type}
                    >
                        <option value="">Select a type</option>
                        <option value="Product">Product</option>
                        <option value="Offer">Offer</option>
                    </select>
                    {formik.errors.type && (
                        <div className="text-red-500 text-sm mt-1">{formik.errors.type}</div>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-[#B1654A] hover:bg-[#8e4d36] text-white py-2 px-4 rounded w-full mt-4"
                >
                    Add Product
                </button>
            </form>
        </div>
    );
}
