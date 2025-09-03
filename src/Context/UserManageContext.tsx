"use client";
import axios, { AxiosError } from "axios";
import { handleUpdateUser, Login, Register} from "@/utils/ApiFunctions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiErrorResponse, register, User } from "@/utils/typs/typs";
import { createContext,Dispatch,SetStateAction,useCallback,useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@/sweetalert";
interface LoginResponse {
  data: {
    token: string;
    role: string;
    userId: string;
    address: string;
  };
}

interface userContextType {
register:(user:register)=>void;
login:(credentials:{userName:string; password:string})=>void;
updateUser:(userId:string,lastName:string,firstName:string,address:string)=>void;
User:User;
userId:string;
setUserId:Dispatch<SetStateAction<string>>
userAddress:string;
setUserAddress:Dispatch<SetStateAction<string>>
userRole:string;
setUserRole:Dispatch<SetStateAction<string>>
setIsLogin:Dispatch<SetStateAction<string>>
isLogin:string
}
const UserManageContext = createContext<userContextType>({
    User:{} as User,
    register: (user: register) => {},
    login: (credentials: { userName: string; password: string }) => {},
    updateUser:(userId:string,lastName:string,firstName:string,address:string)=>{},
    userId:'',
    setUserId:()=>{},
    userAddress:'',
    setUserAddress:()=>{},
    userRole:'',
    setUserRole:()=>{},
    setIsLogin:()=>{},
    isLogin:'false'
});
export const UserManageProvider : React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const[userId,setUserId]=useState<string>('');
    const[userAddress,setUserAddress]=useState<string>('');
    const[userRole,setUserRole]=useState<string>('');
    const[isLogin,setIsLogin]=useState<string>("false")
    useEffect(()=>{
        const userId = localStorage.getItem("sweetyId")
        userId&&setUserId(userId);
        const addr=localStorage.getItem("sweetyUserAddress")
        addr&&setUserAddress(addr)
        const role=localStorage.getItem("sweetyRole")
        role&&setUserRole(role)
        const log =localStorage.getItem("isLogin")
        log&&setIsLogin(log)
        console.log("User ID from localStorage:", log);
    },[])
    const router= useRouter();

const registerMutation = useMutation({
  mutationFn: Register,
  onSuccess: () => {
    
   Toast.fire({
        icon: "success",
        title: "✅ Acconubt Created ",
      });
    router.push("/login");
    
    
  },
  onError: (error: unknown) => {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    const message = axiosError?.response?.data?.message?.toLowerCase();

    if (message?.includes("user already exists")) {
     Toast.fire({
          icon: "warning",
          title: "User Already exist",
        });
    } else {
      console.error("Registration failed:", error);
      console.error("❌ Product update failed:", error);
          Toast.fire({
          icon: "error",
          title: "There is an error ",
        });
    }
  }
});

    const register =useCallback( (user: register) => {
        const formData=new FormData();
        formData.append("userName", user.userName);
        formData.append("password", user.password);
        formData.append("firstName", user.firstName);
        formData.append("lastName", user.lastName);
        formData.append("email", user.email);
        formData.append("address", user.address);
        if (user.image) {
            formData.append("image", user.image);
        }
        registerMutation.mutate(formData);
    },[registerMutation]);
 // 🟢 login mutation
    const loginMutation = useMutation({
        mutationFn: Login,
        onSuccess: (res: LoginResponse) => {
        const token =  res.data.token;
      Toast.fire({
        icon: "success",
        title: "✅ Login Success",
    });
        setIsLogin("true");
        router.push("/products")
        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("sweetyRole", res.data.role);
            localStorage.setItem("sweetyId", res.data.userId);
            localStorage.setItem("sweetyUserAddress", res.data.address);
            localStorage.setItem("isLogin", "true");
            console.log("Login successful. Token saved:", token);
        } else {
            console.warn("No token returned from login");
        }
        },
        onError: (error: unknown) => {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        if (
            axiosError?.response?.status === 404 ||
            axiosError?.response?.data?.message?.toLowerCase().includes("user not found")
        ) {
            alert("⚠️ المستخدم غير موجود، تأكد من البيانات.");
        } else if (
            axiosError?.response?.status === 401 ||
            axiosError?.response?.data?.message?.toLowerCase().includes("invalid credentials")
        ) {
            alert("❌ بيانات الدخول غير صحيحة.");
        } else {
            console.error("Login failed:", error);
            alert("حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.");
        }
}
    });
    const login =useCallback(
     (credentials: { userName: string; password: string }) => {
        loginMutation.mutate(credentials);
    },[loginMutation]);
    //fetch user 
    const{data:User ={} as User }=useQuery({
        queryKey:['User'],
        queryFn:async()=>{
            const res = await axios.get(`api/users/${userId}`)
                return  res.data;
            
        }
    })
    //updateuser
    const updateuserMutation =useMutation({
        mutationFn:handleUpdateUser,
        onSuccess:()=>
        {
            Toast.fire({
        icon: "success",
        title: "✅ User updated ",
      });
        },
        onError:(err)=>{
            console.log("error",err)
        }
    })
    const updateUser =useCallback(
        (userId:string,lastName:string,firstName:string,address:string)=>{

            updateuserMutation.mutate({userId,lastName,firstName,address})
        }
    ,[updateuserMutation])
        const value =useMemo(()=>({
            register,
            login,
            User,
            userId,
            setUserId,
            setUserRole,
            setUserAddress,
            userAddress,
            userRole,
            updateUser,
            setIsLogin,
            isLogin,
        }),[
            setIsLogin,
            isLogin,
            register,
            login,
            User,
            userId,
            setUserId,
            setUserRole,
            setUserAddress,
            updateUser,
            userAddress,
            userRole,
        ])
    return (
        <UserManageContext.Provider value={value}>
            {children}
        </UserManageContext.Provider>
    );

};

export const useUserManage = () => {
    const context = useContext(UserManageContext);
    if (!context) {
        throw new Error("useUserManage must be used within a UserManageProvider");
    }
    return context;
};