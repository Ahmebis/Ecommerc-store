// src/app/Loading.tsx
import { Loader2 } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-100 text-gray-800">
      <div className="flex items-center gap-4 animate-fadeIn">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <span className="text-2xl font-semibold tracking-wide">Loading...</span>
      </div>

      <p className="text-sm text-muted-foreground mt-4 animate-fadeIn">
        Please wait while we prepare your experience.
      </p>
    </div>
  );
}
