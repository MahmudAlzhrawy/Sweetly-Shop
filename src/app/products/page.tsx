import Products from "@/components/products/Products";
import { Metadata } from "next";
export const metadata:Metadata = {
    title: "Products",
    description: "Browse our collection of products",
};
export default function ProductsPage() {
    return (
        <div className="products-page">
            <Products />
        </div>
    );
}