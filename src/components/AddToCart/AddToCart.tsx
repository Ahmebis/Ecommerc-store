"use client";
import React, { useContext, useState } from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { HeartIcon, Loader2, ShoppingCartIcon } from "lucide-react";

import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { CartContext } from "../Context/CartContext";
import { AddToCartAction } from "@/app/(pages)/Products/_action/addToCart.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AddFavProduct from "@/app/(pages)/AddFavProduct/page";
import { addToWishlist } from "@/Helpers/wishList/addToWishlist";

import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";

import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { getUserToken } from "@/Helpers/getUserToken/getUserToken";

export default function AddToCart({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isWishLoading, setIsWishLoading] = useState(false);
  const { getCart, setCartData } = useContext(CartContext);
  const [removingId, setIsRemovingId] = useState<null | string>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const session = useSession();
  const router = useRouter();

  // console.log(session);

  async function addProductToCart() {
    if (session.status == "authenticated") {
      setIsLoading(true);

      const data = await AddToCartAction(productId);
      setCartData(data);
      // console.log("API Response:", data);

      data.status == "success" && toast.success(data.message);
      setIsLoading(false);
      // console.log(data);
    } else {
      router.push("/loging");
    }
  }
  async function handleAddToWishlist() {
    if (session.status === "authenticated") {
      try {
        setIsWishLoading(true);

        const token = await getUserToken();
        if (isInWishlist) {
          const res = await fetch(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            {
              method: "DELETE",
              headers: {
                token: token + "",
              },
            }
          );
          const data = await res.json();
          if (data.success !== "success") {
            setIsInWishlist(false);
            toast.success("Removed from wishlist");
          } else {
            toast.error("Failed to remove from wishlist");
          }
        } else {
          const result = await addToWishlist(productId);

          if (result?.status === "success") {
            toast.success(" Added to wishlist!");
            setIsInWishlist(true);
          } else {
            toast.error(result?.message || " Failed to add to wishlist.");
          }
        }
      } catch (error) {
        toast.error(" Something went wrong while adding to wishlist.");
        console.error(error);
      } finally {
        setIsWishLoading(false);
      }
    } else {
      router.push("/loging");
    }
  }

  return (
    <div>
      <CardFooter className="gap-1">
        <Button
          disabled={isLoading}
          onClick={addProductToCart}
          className="grow md-grow-0 cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ShoppingCartIcon />
          )}
          Add To Cart
        </Button>
        <button
          onClick={handleAddToWishlist}
          disabled={isWishLoading}
          className="flex items-center justify-center"
        >
          {isWishLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-red-500" />
          ) : isInWishlist ? (
            <HeartSolid className="h-6 w-6 text-red-500" />
          ) : (
            <HeartOutline className="h-6 w-6 text-gray-500 hover:text-red-500 transition-colors" />
          )}
        </button>
      </CardFooter>
    </div>
  );
}
