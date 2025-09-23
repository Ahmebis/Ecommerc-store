import { ProductI } from "@/Interface/product";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import StarIcons from "@/components/Icons/StarIcons";
import Link from "next/link";
import AddToCart from "@/components/AddToCart/AddToCart";

export default async function Products() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/products"
  );

  const { data: products }: { data: ProductI[] } = await response.json();

  // console.log(products[0]);

  return (
    <>
      <div className="flex flex-wrap">
        {products.map((product) => (
          <div
            key={product.id}
            className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 "
          >
            <Card className="">
              {/* <Link href={"/products/" + product.id}>
               */}
              <Link href={`/${product.id}`}>
                <Image
                  src={product.imageCover}
                  className="w-full"
                  alt=""
                  width={300}
                  height={400}
                />
                <CardHeader>
                  <CardTitle>{product.title.split(" ", 2)}</CardTitle>
                  <CardDescription>{product.category.name}</CardDescription>
                  <CardAction>{product.brand.name}</CardAction>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between ">
                    <StarIcons />

                    <p>{product.ratingsAverage}</p>
                    {/* <p>{products[0].ratingsQuantity}</p> */}
                  </div>
                  <p className="pt-2">
                    Price :{" "}
                    <span className="text-bold font-bold">
                      {product.price} EGP
                    </span>
                  </p>
                </CardContent>
              </Link>
              <AddToCart productId={product.id} />
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
