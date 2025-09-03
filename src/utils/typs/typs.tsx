export interface User{
    _id:string,
    userName:string,
    image:string,
    role:string,
    address:string,
    lastName:string,
    firstName:string,
    email:string

}
export interface addProduct {
    name: string;
    description: string;
    price: number;
    category: string;
    type: string;
    image: File;
}
export interface Product {
    _id: string;
    category: string;
    type: string;
    name: string;
    description: string;
    price: number;
    image: string;
}
export interface CartItem {
_id: string;
userId: string;
items: {
_id: string;
product: {
    _id: string;
    name: string;
    price: number;
    image: string;
};
quantity?: number; 
}[];
}
    

export interface AddCartItem {
    id: string;
    userId:string,
    type: string;
    name: string;
    description: string;
    price: number;
    image: string;
}
 export interface ApiErrorResponse {
  message?: string;
}
export interface register {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    image?: File | null;
}
export interface Order {
  _id: string;
  user: {
    userName:string,
    address:string,
    email:string
  };
  products: {
    product: Product; // بيانات المنتج
    quantity: number; // الكمية المطلوبة
  }[];
  totalAmount: number;
  status: "pending" | "shipped" | "delivered";
  createdAt: string; // تاريخ الإنشاء
}
export interface Cart {
    userId: string;
    items: CartItem[];
}
export interface Review {
    _id: string;
    productId: string;
    userId: string;
    rating: number;
    comment: string;
    reviewDate: string;
}