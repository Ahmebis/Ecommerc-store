import { ProductI } from "@/Interface";
import { Params } from "next/dist/server/request/params";
import React from "react";
import Image from "next/image";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StarIcons from "@/components/Icons/StarIcons";
import { Button } from "@/components/ui/button";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AddToCart from "@/components/AddToCart/AddToCart";

export default async function ProductDetails({ params }: { params: Params }) {
  let { ProductId } = await params;

  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/` + ProductId
  );

  const { data: product }: { data: ProductI } = await response.json();

  console.log(product);

  // console.log(await response.json());

  if (!product) {
    return (
      <div className="text-center text-red-500 text-xl py-10">
        Product not found or failed to load.
      </div>
    );
  }

  return (
    <Card className="grid md:grid-cols-3 items-center">
      <div className="col-span-1">
        <Carousel className="w-full max-w-md">
          <CarouselContent>
            {product.images?.map((img, index) => (
              <CarouselItem key={index}>
                <Image
                  src={img}
                  alt={`Product image ${index + 1}`}
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="md:col-span-2 space-y-4">
        <CardHeader>
          <CardDescription>{product.brand.name}</CardDescription>
          <CardTitle className="text-2xl">{product.title}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <CardDescription>{product.category.name}</CardDescription>
          <div className="flex justify-between items-center mt-3 ">
            <p className="flex gap-1 ">
              <StarIcons />
              Rating : <span>{product.ratingsAverage}</span>
            </p>
            <p>
              Remaining :<span>{product.ratingsQuantity}</span>
            </p>
          </div>
          <div className="flex justify-between items-center mt-3">
            <p className="flex gap-1">
              Price :<span className="font-bold">{product.price} EGP</span>
            </p>
            <p className="flex gap-1">
              Quantity :<span className="font-bold">{product.quantity}</span>
            </p>
          </div>
        </CardContent>
        <AddToCart productId={product.id} />
      </div>
    </Card>
  );
}
