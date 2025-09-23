import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ["/Cart", "/Profile"];

const authPages = ["/loging", "/Register"];

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (protectedPages.includes(req.nextUrl.pathname)) {
    if (token) {
      return NextResponse.next();
    } else {
      let redirectUrl = new URL("/loging", process.env.NEXTAUTH_URL);

      redirectUrl.searchParams.set("callback-url", req.nextUrl.pathname);

      return NextResponse.redirect(redirectUrl);
    }
  }

  if (authPages.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.next();
    } else {
      const redirectUrl = new URL("/", process.env.NEXTAUTH_URL);
      return NextResponse.redirect(redirectUrl);
    }
  }
  return NextResponse.next();
}
