"use client"
import { useProductsAndOrders } from "@/Context/Products&OrdersManageContext";
import Image from "next/image";
import { useCallback, useState } from "react";

export default function Orders() {
  const { orders, deleteOrder, updateOrder } = useProductsAndOrders();

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");

  const handleDelete = useCallback(
    (id: string) => {
      deleteOrder(id);
    },
    [deleteOrder]
  );

  const handleOpenModal = (orderId: string) => {
    setSelectedOrderId(orderId);
    setNewStatus(""); // reset selection
  };

  const handleCloseModal = () => {
    setSelectedOrderId(null);
    setNewStatus("");
  };

  const handleSubmitStatus = () => {
    if (selectedOrderId && newStatus) {
      updateOrder(selectedOrderId, newStatus); // 🔥 call context function
      handleCloseModal();
    } else {
      alert("Please select a status");
    }
  };

  return (
    <div className="orders container h-screen mx-auto p-4 space-y-4 relative">
      {orders.length > 0 ? (
        orders.map(({ _id, products, user, status, totalAmount, createdAt }, index) => (
          <div
            key={index}
            className="order flex flex-col bg-[#FBECE0] text-[#633d2f] p-4 rounded-xl shadow shadow-[#422b22]"
          >
            {/* وقت الإنشاء والحالة */}
            <div className="time-status flex justify-between items-center px-2 mb-2">
              <p>{new Date(createdAt).toLocaleString()}</p>
                <p
                className={`capitalize px-4 py-2 rounded-xl text-white font-semibold
                    ${status === "pending" ? "bg-yellow-500" : ""}
                    ${status === "shipped" ? "bg-blue-500" : ""}
                    ${status === "delivered" ? "bg-green-500" : ""}
                `}
                >
                {status}
                </p>
            </div>

            <hr className="bg-[#9c3712]" />

            {/* user information */}
            <div className="user my-2">
              <p>{user.userName}</p>
              <p>{user.address}</p>
            </div>

            <hr className="bg-[#9c3712]" />

            {/* قائمة المنتجات */}
           <div className="products bg-[#f5d5c9] px-2 space-y-2">
              {products.map(({ product, quantity }, i) => (
                <div key={i} className="flex items-center space-x-3">
                  {product ? (
                    <Image
                      src={product.image ?? "/placeholder.png"} // صورة بديلة لو مفيش
                      alt={product.name ?? "No name"}
                      className="object-cover rounded-full"
                      height={30}
                      width={30}
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-gray-500">❌ منتج غير متوفر</span>
                  )}

                  <div className="flex justify-between w-full py-2">
                    <p>{product?.name ?? "غير معروف"}</p>
                    <p>
                      {quantity} × ${product?.price ?? 0}
                    </p>
                  </div>
                </div>
              ))}
            </div>


            <hr className="bg-[#9c3712]" />

            {/* المجموع */}
            <div className="mt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span>${totalAmount}</span>
            </div>

            {/* الأكشنز */}
            <div className="flex justify-between items-center mt-2">
              <button
                onClick={() => handleDelete(_id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete Order
              </button>
              <button
                onClick={() => handleOpenModal(_id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Update Order Status
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl text-gray-600">🚫 لا يوجد طلبات حتى الآن</p>
        </div>
      )}

      {/* 🔥 Modal */}
      {selectedOrderId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">تحديث حالة الطلب</h2>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            >
              <option value="">اختر الحالة</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>

            <div className="flex justify-between">
              <button
                onClick={handleSubmitStatus}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                تأكيد
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
