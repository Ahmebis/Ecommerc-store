import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="w-full h-[90vh] flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to <span className="text-black">CircleShop</span>
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-xl">
          Discover the best deals on your favorite products. Fast delivery,
          great prices, and top brands — all in one place!
        </p>
        <div className="flex gap-4">
          <Link href="/Products">
            <button className="bg-black text-white px-6 py-3 rounded-md hover:opacity-90 transition">
              Shop Now
            </button>
          </Link>
          <Link href="/categories">
            <button className="bg-white text-black border border-black px-6 py-3 rounded-md hover:bg-gray-200 transition">
              Browse Categories
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
