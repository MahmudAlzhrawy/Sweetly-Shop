'use client'
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

import { createContext,Dispatch,SetStateAction,useCallback,useContext, useEffect, useMemo, useState } from "react";
import axios, { AxiosError } from "axios";
import { addProduct, Product ,CartItem ,AddCartItem, Order, ApiErrorResponse  } from "@/utils/typs/typs";
import { handleAddOrder, CreateProduct, DeleteProduct, FetchProducts, UpdateProduct, handleDeleteOrder, handleUpdateOrder, getCart, addItemToCart, updateQuantity, removeFromCart  } from "@/utils/ApiFunctions";
import { useUserManage } from "./UserManageContext";
import { Toast } from "@/sweetalert";


interface ProductsAndOrdersManageContextType {
orders:Order[]  
cart:CartItem,
products:Product[],
productID:string;
isOpenDetailes:boolean;
isLoading:boolean;
error:Error|null;
isCartLoading:boolean;
cartError:Error|null;
filter:string;
cayegoryFilter:string,
updateOrder:(userId:string,status:string)=>void,
deleteOrder:(userId:string)=>void,
setCategoryFilter:Dispatch<SetStateAction<string>>,
setFilter:Dispatch<SetStateAction<string>>
setProductID:Dispatch<SetStateAction<string>>
setOpenDetailes:Dispatch<SetStateAction<boolean>>
updateProductQuantity:(userId:string,productId:string,status:string)=>void,
deleteFromCart:(productId:string,userId:string)=>void,
addToCart:({ userId, productId, quantity }: { userId: string; productId: string; quantity: number }) => void,
addOrder:(userId:string,cart:CartItem)=>void;
addProduct:(product:addProduct)=> void;
deleteProduct:(productId:string)=> void;
updateProduct:(productId:string,product:addProduct)=> void;

}
const ProductsAndOrdersManageContext = createContext<ProductsAndOrdersManageContextType>({
    orders:[],
    cart:{ _id:'', userId:'', items:[] },
    isOpenDetailes: false,
    productID: '',
    products: [],
    isLoading: false,
    error: null,
    filter:'',
    cayegoryFilter:'',
    cartError:null,
    isCartLoading:false,
    updateOrder:()=>{},
    deleteOrder:()=>{},
    setCategoryFilter:()=>{},
    setFilter:()=>{},
    addOrder:()=>{},
    deleteFromCart:()=>{},
    addToCart:()=>{},
    updateProductQuantity:()=>{},
    setProductID: () => {},
    setOpenDetailes: () => {},
    addProduct:  () => {},
    deleteProduct:  () => {},
    updateProduct: () => {},
});

export const  ProductsAndOrdersManageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [productID, setProductID] = useState<string>('');
    const [isOpenDetailes, setOpenDetailes] = useState<boolean>(false);
    const [filter,setFilter]= useState<string>("")
    const [cayegoryFilter,setCategoryFilter]=useState<string>("")
    const {userId,userRole}=useUserManage();

  // تحميل البيانات من localStorage أول ما الكومبوننت يشتغل
  // 🛠️ Helper function لبناء الـ FormData
  const buildProductFormData = (product: addProduct) => {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("type", product.type);
    formData.append("description", product.description);
    formData.append("price", product.price.toString());
    if (product.image) formData.append("image", product.image);
    return formData;
  };
  const queryClient = useQueryClient();
//fetch cart 
const{data:cart = { _id: '', userId: '', items: [] } ,isLoading:isCartLoading, error:cartError}=useQuery<CartItem>({
  queryKey:["cart",userId],
  queryFn: () => getCart(userId!),
  enabled: !!userId,
})
//add product
const addCartMutation=useMutation({
  mutationFn:addItemToCart,
  onSuccess:()=>{
    Toast.fire({
      icon: "success",
      title: "✅ Item added to cart",
    });
    
    queryClient.invalidateQueries({ queryKey: ["cart", userId] });
    
  },
  onError: (error) => {
    Toast.fire({
      icon: "error",
      title: "❌ Failed to add item",
      text: error.message,
    });
  },
})
const addToCart =useCallback((({userId, productId, quantity}) => {
  addCartMutation.mutate({ userId, productId, quantity });
}), [addCartMutation]);


//update Quantity
const quantityMutation=useMutation({
  mutationFn:updateQuantity,
  onSuccess:()=>{
    queryClient.invalidateQueries({ queryKey: ["cart", userId] });
  }
})
const updateProductQuantity =useCallback((userId:string,productId:string,status:string)=>{
  quantityMutation.mutate({userId,productId,status})
},[quantityMutation])
 //delete from cart 
const deleteMutation=useMutation({
  mutationFn:removeFromCart,
  onSuccess:()=>{
      Toast.fire({
        icon: "success",
        title: " removed from cart",
      });
    queryClient.invalidateQueries({ queryKey: ["cart", userId] });
  },
   onError: (error) => {
    Toast.fire({
      icon: "error",
      title: "❌ Failed to add item",
      text: error.message,
    });
  },

})
const deleteFromCart =useCallback((userId:string,productId:string)=>{
  deleteMutation.mutate({userId,productId})
},[deleteMutation])





  // 🆕 Create product mutation
  const productMutation = useMutation({
  mutationFn: CreateProduct,
  onSuccess: () => {
    Toast.fire({
      icon: "success",
      title: "✅ Product added successfully",
    });
    queryClient.invalidateQueries({ queryKey: ["products"] });
  },
  onError: (error: unknown) => {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const message = axiosError?.response?.data?.message?.toLowerCase();
    if (message?.includes("product already exists")) {
      Toast.fire({
        icon: "warning",
        title: "⚠️ Product already exists",
      });
    } else {
      console.error("❌ Product creation failed:", error);
      Toast.fire({
        icon: "error",
        title: "❌ Failed to add product. Please try again.",
      });
    }
  },
});
    const addProduct = useCallback(
    (product: addProduct) => {
      productMutation.mutate(buildProductFormData(product));
    },
    [productMutation]
  );

 
  // ✏️ Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: UpdateProduct,
    onSuccess: () => {
        Toast.fire({
        icon: "success",
        title: "✅ Product updated ",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const message = axiosError?.response?.data?.message?.toLowerCase();
      if (message?.includes("product not found")) {
          Toast.fire({
          icon: "warning",
          title: "Product not found",
        });
      } else {
        console.error("❌ Product update failed:", error);
          Toast.fire({
          icon: "error",
          title: "There is an error ",
        });
      }
    },
  });

  const updateProduct = useCallback(
    (id: string, product: addProduct) => {
      updateProductMutation.mutate({ id, data: buildProductFormData(product) });
      
    },
    [updateProductMutation]
  );
     // 🗑️ Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: DeleteProduct,
    onSuccess: () => {
      
     Toast.fire({
        icon: "success",
        title: "✅ Product deleted ",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const message = axiosError?.response?.data?.message?.toLowerCase();
      if (message?.includes("product not found")) {
      Toast.fire({
          icon: "warning",
          title: "Product not found",
        });
      } else {
        console.error("❌ Product deletion failed:", error);
        console.error("❌ Product update failed:", error);
          Toast.fire({
          icon: "error",
          title: "There is an error ",
        });
      }
    },
  });

  const deleteProduct = useCallback(
    (productId: string) => {
      deleteProductMutation.mutate(productId);
    },
    [deleteProductMutation]
  );
    // fetchproducts code useing use query
    const {
    data: products = [],
    isLoading,
    error,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn:FetchProducts,
  });

    //fetch orders 
    const { data: orders = [] } = useQuery<Order[]>({
    queryKey: ["orders", userId],
    queryFn: async () => {
      if(userRole==="admin"){
        const res = await axios.get(`/api/oreders?`);
        return res.data.orders;
      }
      else{
        const res = await axios.get(`/api/oreders?userId=${userId}`);
        return res.data.orders;
      }
    },
  });
  

    //create order
    // 🛒 Create order mutation
  const orderMutation = useMutation({
    mutationFn: handleAddOrder,
    onSuccess: () => {
      Toast.fire({
        icon: "success",
        title: "✅ Order Created  ",
      });     
      queryClient.invalidateQueries({ queryKey: ["orders", userId] });
    },
    onError: (error: unknown) => {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      const message = axiosError?.response?.data?.message?.toLowerCase();
      if (message) console.log("Error message", message);
      else console.log("Error", error);
    },
  });
  //delete order
    const deleteOrderMutaiton =useMutation({
      mutationFn:handleDeleteOrder,
      onSuccess:()=>{
      Toast.fire({
        icon: "success",
        title: "✅ Order Deleted ",
      });        queryClient.invalidateQueries({ queryKey: ["orders"] });
      },
      onError:(error)=>{
        console.log("error",error)
      }
    })
    //update order 
    const updateOrderMutation=useMutation({
      mutationFn:handleUpdateOrder,
      onSuccess:()=>{
        Toast.fire({
        icon: "success",
        title: "✅ Order updated ",
      });
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      },
      onError:(err)=>{
        console.log("error",err)
      }
    })
    const updateOrder =useCallback(
      (userId:string,status:string)=>{
        updateOrderMutation.mutate({userId,status})
    },[updateOrderMutation])
    const deleteOrder =useCallback(
      (userId:string)=>{
        deleteOrderMutaiton.mutate({userId})
    },[deleteOrderMutaiton])
  const addOrder = useCallback(
    (userId: string, cart: CartItem) => {
      orderMutation.mutate({ userId, cart });
    },
    [orderMutation]
  );

    const value = useMemo(() => ({
    isOpenDetailes,
    isLoading,
    cartError:isError ? (error as Error) : null,
    isCartLoading,
    error: isError ? (error as Error) : null,
    productID,
    products,
    cart,
    orders,
    filter,
    cayegoryFilter,
    updateOrder,
    deleteOrder,
    setCategoryFilter,
    setFilter, 
    addOrder,
    addToCart,
    setOpenDetailes,
    setProductID,
    addProduct,
    deleteProduct,
    updateProduct,
    updateProductQuantity,
    deleteFromCart,
  }), [
    cartError,
    isCartLoading,
    isOpenDetailes,
    isLoading,
    isError,
    error,
    productID,
    products,
    cart,
    orders,
    filter,
    cayegoryFilter,
    updateProductQuantity,
    deleteFromCart,
    updateOrder,
    deleteOrder,
    setCategoryFilter,
    setFilter,
    addOrder,
    addToCart,
    setOpenDetailes,
    setProductID,
    addProduct,
    deleteProduct,
    updateProduct
  ]);
return(
<ProductsAndOrdersManageContext.Provider value={value}>
    {children}
</ProductsAndOrdersManageContext.Provider>)
}
export const useProductsAndOrders = () => {
    const context = useContext(ProductsAndOrdersManageContext);
    if (!context) {
        throw new Error("useProductsAndOrdersManageContext must be used within a ProductsAndOrdersManageProvider");
    }
    return context;
}