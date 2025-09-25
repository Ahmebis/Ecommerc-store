"use client";

import React, { useState } from "react";

export default function ForgetPass() {
  const [email, setEmail] = useState("");

  const handleForgetPassword = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      const response = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      console.log(data);
      alert("✅ Verification code sent to your email.");
      // Optionally redirect to verification page here
    } catch (error) {
      console.error(error);
      alert("❌ Network or server error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        Please enter your email to receive a verification code
      </h2>

      <label className="block mb-2 text-sm font-medium">Email</label>
      <input
        type="email"
        className="w-full border border-gray-300 p-2 rounded mb-4"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleForgetPassword}
        className="w-full bg-black text-white p-2 rounded hover:bg-black"
      >
        Verify
      </button>
    </div>
  );
}
