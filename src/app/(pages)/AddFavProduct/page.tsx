"use client";

import React, { useEffect, useState } from "react";
import { getUserToken } from "@/Helpers/getUserToken/getUserToken";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

export default function AddFavProduct() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setIsRemovingId] = useState<null | string>(null);
  const router = useRouter();

  async function removeWishlistItem(productId: string) {
    try {
      setIsRemovingId(productId);

      const token = await getUserToken();
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/wishlist/" + productId,
        {
          method: "DELETE",
          headers: {
            token: token + "",
          },
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        toast.success("Product removed successfully");

        setWishlist((prev) => prev.filter((item) => item.id !== productId));
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsRemovingId(null);
    }
  }
  useEffect(() => {
    async function fetchWishlist() {
      try {
        const token = await getUserToken();

        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/wishlist",
          {
            method: "GET",
            headers: {
              token: token + "",
            },
          }
        );

        const result = await response.json();

        if (result?.data) {
          setWishlist(result.data);
        } else {
          console.warn("No data in wishlist", result);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWishlist();
  }, []);

  if (loading)
    return <div className="p-4 text-center">Loading wishlist...</div>;

  if (wishlist.length === 0)
    return (
      <div className="p-4 text-center text-gray-500">
        No products in wishlist yet.
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center"> Your Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg shadow hover:shadow-md transition p-3 text-center"
          >
            <div
              className="cursor-pointer"
              onClick={() => router.push(`/products/${product.id}`)}
            >
              <div className="relative w-full h-40 mb-2">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  fill
                  className="object-contain rounded"
                />
              </div>
              <h2 className="text-md font-semibold">{product.title}</h2>
              <p className="text-sm text-gray-600">{product.category?.name}</p>
            </div>

            <button
              onClick={() => removeWishlistItem(product.id)}
              aria-label="remove"
              disabled={removingId === product.id}
              className="text-red-600 hover:underline text-sm flex items-center justify-center gap-1 mt-2 ms-auto"
            >
              {removingId === product.id && (
                <Loader2 className="animate-spin size-5" />
              )}
              <span className=""> Remove</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
