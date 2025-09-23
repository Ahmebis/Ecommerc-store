import { getUserToken } from "@/Helpers/getUserToken/getUserToken";
import { CartResponse } from "@/Interface";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await getUserToken();
  const response = await fetch(`${process.env.URL_API}/cart`, {
    method: "GET",
    headers: {
      token: token + "",
    },
  });
  const data: CartResponse = await response.json();

  return NextResponse.json(data);
}
