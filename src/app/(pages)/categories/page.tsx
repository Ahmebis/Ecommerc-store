import Image from "next/image";
import React from "react";

export default async function Brands() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );

  const { data } = await response.json();

  console.log(data);
  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">All Categories</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((brand: any) => (
            <div
              key={brand._id}
              className="border rounded shadow p-4 text-center hover:shadow-lg transition"
            >
              <div className="relative w-full h-32 mb-3">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain rounded"
                />
              </div>
              <p className="text-lg font-medium">{brand.name}</p>
            </div>
          ))}
        </div>
      </div>
      ;
    </>
  );
}
