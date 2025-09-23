"use client";
import React, { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";
import CartContextProvider from "@/components/Context/CartContext";
import { SessionProvider } from "next-auth/react";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <CartContextProvider>
        <Navbar />
        <div className="container mx-auto py-4">
          <main>
            <Toaster />
            {children}
          </main>
        </div>
      </CartContextProvider>
    </SessionProvider>
  );
}
