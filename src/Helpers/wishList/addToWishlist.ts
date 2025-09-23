// src/helpers/addToWishlist.ts
import { getUserToken } from "../getUserToken/getUserToken";

export async function addToWishlist(productId: string) {
  const token = await getUserToken();

  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        token: token + "",
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  console.log("data is", data);
  return data;
}
