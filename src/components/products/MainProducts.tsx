"use client"
import Loading from "@/app/loading";
import { useProductsAndOrders } from "@/Context/Products&OrdersManageContext";
import Card from "@/UI/Card";
import { useCallback,useMemo} from "react";
import { useUserManage } from "@/Context/UserManageContext";

export default function MainProducts(){
    const{setOpenDetailes,setProductID,deleteProduct,setFilter,cayegoryFilter,products,isLoading,error,filter} =useProductsAndOrders()
    const{userRole}=useUserManage()
    //callbacks function

const handleOpen =useCallback(
    (productId:string)=>{
        setProductID(productId);
        setOpenDetailes(true)
},[setOpenDetailes,setProductID])

const filteredProducts = useMemo(() => {
  return products.filter((product) => {
    const name = product.name || "";
    const category = product.category || "";
    const search = filter || "";
    const categorySearch = cayegoryFilter || "";
    return product.type === "Product" &&
    (name.toLowerCase().includes(search.toLowerCase()) &&
    category.toLowerCase().includes(categorySearch.toLowerCase()));
  });
}, [products, filter, cayegoryFilter]);

    return(
    <div className="">
        <div className="titles flex justify-between px-4">
            <h1 className="text-lg text-[#331A12] font-bold my-4">Main Products</h1>
            <h1 onClick={()=>{setFilter("")}} className="text-sm text-[#331A12] font-bold my-4">See All</h1>
        </div>
        <div className="products">
            {isLoading && <div><Loading /></div>}
            {error && <p>Error: {error.message}</p>}
            {filteredProducts && filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                        <Card   key={product._id} className="product-card flex flex-col items-center p-4 rounded shadow mx-3">
                            <img  onClick={()=>{
                                    handleOpen(product._id)
                                }}  src={product.image} alt={product.name} className="w-full overflow-hidden h-full hover:scale-110 transition-all duration-300 ease-in-out  object-cover mb-2 rounded-full" />
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p className="text-green-600 font-bold">${product.price}</p>
                            <div>
                                {userRole ==="admin"&&
                                <button 
                                onClick={()=>{
                                    deleteProduct(product._id)
                                }} 
                                    className="flex items-center  w-full justify-center bg-[#B86F55] text-white px-4 py-2 rounded mt-2 hover:bg-[#a07263] transition-colors duration-300 ml-2" title="View Details"
                                >Delete product</button>
                                }
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>No products available.</Card>
            )}
        </div>
    </div>
    )
}