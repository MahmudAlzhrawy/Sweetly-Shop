import axios from "axios";
import { CartItem} from "./typs/typs";

export async function FetchProducts() {
  const res = await axios.get("/api/products");
  return res.data
}

export async function handleAddOrder({userId,cart}:{userId:string,cart:CartItem[]}){
const res = await axios.post("/api/oreders", {
      userId,
      cart: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    });
    return res.data;
}
export async function handleDeleteOrder({userId}:{userId:string}){
const res = await axios.delete(`/api/oreders/${userId}`);
    return res.data;
}
export async function handleUpdateOrder({userId,status}:{userId:string,status:string}){
const res = await axios.put(`/api/oreders/${userId}`,{
    status
});
    return res.data;
}
export async function handleUpdateUser({
  userId,
  address,
  lastName,
  firstName,
}: {
  userId: string;
  address: string;
  lastName: string;
  firstName: string;
}) {
  const res = await axios.patch(
    `/api/users/${userId}`,
    { lastName, firstName, address }, // JSON object
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
}

export async function CreateProduct(data: FormData){
    const res = await axios.post("/api/products", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
}
export async function FetchProductById(id: string){
    const res = await axios.get(`/api/products/${id}`);
    return res.data;
}
export async function UpdateProduct({ id, data }: { id: string; data: FormData }){
    const res = await axios.put(`/api/products/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return res.data;
}
export async function DeleteProduct(id: string){
    const res = await axios.delete(`/api/products/${id}`);
    return res.data;
}

export async function Login(data: { userName: string; password: string }) {
        const res = await axios.post("/api/users/login", data,{
            headers: {
                "Content-Type": "application/json",
            },
        });
        
        return res;
}
export function Register(data: FormData) {
    try{
        const res = axios.post('/api/users/register', data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("User registered successfully:", res);
        return res;
    }catch(error){
        console.error("Error registering user:", error);
        throw error;
    }
}
