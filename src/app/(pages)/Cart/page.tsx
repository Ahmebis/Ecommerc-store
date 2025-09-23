"use client";
import Loading from "@/app/Loading";
import { CartContext } from "@/components/Context/CartContext";
import { formatCurrency } from "@/Helpers/folderPrice";
// import { formatCurrency } from "@/Helpers/folderPrice";
import React, { useContext, useState, useEffect } from "react";

import Products from "../Products/page";
import { CartResponse } from "@/Interface";
import toast from "react-hot-toast";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import CheckOut from "@/components/CheckOut/CheckOut";
import { getUserToken } from "@/Helpers/getUserToken/getUserToken";

export default function Cart() {
  let { cartData, isLoading, getCart, setCartData } = useContext(CartContext);
  const [removingId, setIsRemovingId] = useState<null | string>(null);
  const [updateId, setIsUpdateId] = useState<null | string>(null);
  const [isClearing, setIsClearing] = useState<boolean>(false);
  useEffect(() => {
    if (
      !cartData ||
      typeof cartData?.data?.products?.[0]?.product === "string"
    ) {
      getCart();
    }
  }, [cartData, getCart]);

  // if (
  //   typeof cartData?.data?.products?.[0]?.product === "string" ||
  //   cartData == null
  // ) {
  //   getCart();
  // }

  async function clearCartItem() {
    setIsClearing(true);
    const token = await getUserToken();
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/",
      {
        method: "DELETE",
        headers: {
          token: token + "",
        },
      }
    );
    const data: CartResponse = await response.json();
    if (data.message == "success") {
      setCartData(null);
    }
    setIsClearing(false);
  }

  async function updateCartItemCount(productId: string, count: number) {
    const token = await getUserToken();
    if (!token) return;

    setIsUpdateId(productId);

    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      {
        method: "PUT",
        body: JSON.stringify({ count }),
        headers: {
          token,
          "Content-Type": "application/json",
        },
      }
    );

    const data: CartResponse = await response.json();

    if (data.status === "success") {
      toast.success("Product quantity updated successfully");
      setCartData(data);
    }

    setIsUpdateId(null);
  }

  async function removeCartItem(productId: string) {
    setIsRemovingId(productId);
    const token = await getUserToken();
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart/" + productId,
      {
        method: "DELETE",
        headers: {
          token: token + "",
        },
      }
    );
    const data: CartResponse = await response.json();
    if (data.status == "success") {
      toast.success("product Removed Succesfully");
      setCartData(data);
    }
    setIsRemovingId(null);
  }

  async function checkOutSession(
    cartId: string,
    details: string,
    city: string,
    phone: number
  ) {
    const shippingAdress = {
      details,
      city,
      phone,
    };
    const token = await getUserToken();
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAdress }),
        headers: {
          token: token + "",
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  return (
    <>
      {isLoading || typeof cartData?.data?.products[0]?.product == "string" ? (
        <Loading />
      ) : cartData?.numOfCartItems! > 0 ? (
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          <p className="text-muted-foreground mt-1">1 item in your cart</p>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6">
            <div className="lg:col-span-2">
              {cartData?.data.products.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card"
                >
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="min-w-0">
                        <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.product.brand.name} ·{" "}
                          {item.product.category.name}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-semibold">
                          {formatCurrency(item.price)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          disabled={item.count == 1}
                          onClick={() =>
                            updateCartItemCount(
                              item.product._id,
                              item.count - 1
                            )
                          }
                          aria-label="decrease"
                          className="size-8 rounded-lg border hover:bg-accent"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-medium">
                          {item.count}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItemCount(
                              item.product._id,
                              item.count + 1
                            )
                          }
                          aria-label="increase"
                          className="size-8 rounded-lg border hover:bg-accent"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeCartItem(item.product.id)}
                        aria-label="remove"
                        disabled={removingId == item.product.id}
                        className="text-destructive hover:underline text-sm flex cursor-pointer gap-1 items-center"
                      >
                        {removingId == item.product.id && (
                          <Loader2 className="animate-spin size-5" />
                        )}
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1 sticky top-20 h-fit rounded-xl border bg-card p-4 shadow-sm space-y-4">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Subtotal : {cartData?.numOfCartItems}
                </span>
                <span className="font-medium">
                  {cartData?.data.totalCartPrice}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">{formatCurrency(0)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium">{formatCurrency(0)}</span>
              </div>
              <hr />
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatCurrency(cartData?.data.totalCartPrice!)}</span>
              </div>

              <CheckOut cartId={cartData?.cartId!} />
              <button className="w-full bg-white text-black font-medium py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition">
                Continue Shopping
              </button>
              <Button
                onClick={clearCartItem}
                className="bg-red-600 cursor-pointer block ms-auto hover:bg-red-600"
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground mt-2">
            Looks like you haven’t added anything to your cart yet.
          </p>
          <button className="mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90">
            <Link href="/Products"> Continue Shopping</Link>
          </button>
        </div>
      )}
    </>
  );
}
