"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React, { useContext } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HeartIcon,
  Loader2,
  ShoppingCartIcon,
  User,
  UserIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CartContext } from "../Context/CartContext";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { isLoading, cartData } = useContext(CartContext);

  const session = useSession();
  // console.log(session);

  return (
    <nav className="py-3 bg-white  text-2xl font-semibold sticky top-0">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="">
            <Link href={"/"}>
              circle
              <span className="text-4xl mt-3 font-bold font-sans p-0.25">
                s
              </span>
              hop
            </Link>
          </h1>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/Products">Products</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/categories">Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/brands">Brands</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/AddFavProduct">
                    {" "}
                    <HeartIcon className="size-5 mt-0.5 cursor-pointer" />
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-0">
                <UserIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session.status === "authenticated" ? (
                  <>
                    <DropdownMenuItem
                      onClick={() =>
                        signOut({
                          callbackUrl: "/",
                        })
                      }
                    >
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <Link href="/loging">
                      <DropdownMenuItem>Login</DropdownMenuItem>
                    </Link>

                    <Link href="/Register">
                      <DropdownMenuItem>Register</DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            {session.status == "authenticated" && (
              <div className="relative p-3">
                {isLoading ? (
                  <Loader2 className="animate-spin text-black z-50" />
                ) : (
                  <>
                    <Link href={"/Cart"}>
                      <ShoppingCartIcon />
                    </Link>

                    <Badge className=" size-5 pb-1.5 pt-1 px-1  rounded-full p-1 absolute top-0 end-0">
                      <span>{cartData?.numOfCartItems}</span>
                    </Badge>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
