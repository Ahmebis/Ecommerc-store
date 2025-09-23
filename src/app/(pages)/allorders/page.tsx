"use client";

import React, { useEffect, useState } from "react";

import { Shipping } from "@/Interface/Shipping";
import { getUserToken } from "@/Helpers/getUserToken/getUserToken";
import { useSession } from "next-auth/react";

export default function AllOrders() {
  const [orders, setOrders] = useState<Shipping[]>([]);
  const [loading, setLoading] = useState(true);

  async function getOrders() {
    // const token = getUserToken();
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/orders/user/" +
        localStorage.getItem("userId")
    );

    const storedUserId = localStorage.getItem("userId");
    console.log("User ID from localStorage:", storedUserId);

    const data = await response.json();

    console.log(data);
    setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    getOrders();
  });

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-300 rounded-lg p-4 mb-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold mb-2">
              Order #{order.id} - {order.isPaid ? "✅ Paid" : "❌ Not Paid"}
            </h2>
            <p className="text-sm text-gray-600 mb-1">
              Ordered on: {new Date(order.createdAt).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Payment method: {order.paymentMethodType}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Total: <strong>{order.totalOrderPrice} EGP</strong>
            </p>
            <p className="text-sm text-gray-600 mb-1">
              Delivered: {order.isDelivered ? "✅ Yes" : "❌ No"}
            </p>

            <div className="mt-3">
              <h3 className="font-medium mb-1">User Info:</h3>
              <p>Name: {order.user.name}</p>
              <p>Email: {order.user.email}</p>
              <p>Phone: {order.user.phone}</p>
            </div>

            <div className="mt-4">
              <h3 className="font-medium mb-1">
                Cart Items: ({order.cartItems.length})
              </h3>
              <ul className="list-disc pl-6">
                {order.cartItems.map((item, idx) => (
                  <li key={idx}>{item.product?.title || "Product"}</li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
