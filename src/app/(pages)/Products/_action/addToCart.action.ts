"use server";
import { getUserToken } from "@/Helpers/getUserToken/getUserToken";

export async function AddToCartAction(productId: string) {
  try {
    const token = await getUserToken();

    console.log("token is " + token);

    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/cart",
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

    return data;
  } catch (err) {
    console.log(err);
  }
}
