import React from "react";
import { LoginForm } from "./_Components/LogingForm/LogingForm";

export default function Login() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome</h1>
        <LoginForm />
      </div>
    </div>
  );
}
