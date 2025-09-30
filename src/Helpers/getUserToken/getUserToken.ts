"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const x = (await cookies()).get("next-auth.session-token")?.value;

  console.log("Cookie token:", x);

  const accessToken = await decode({
    token: x,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  console.log("Decoded token:", accessToken);
  return accessToken?.token;
}
