"use client";

import { useState } from "react";

import { supabase } from "@/lib/supabase";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const login = async () => {
    const { error } =
      await supabase.auth.signInWithPassword(
        {
          email,
          password,
        }
      );

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-5xl font-black text-slate-900">
          Momentum
        </h1>

        <p className="text-slate-500 mt-3">
          Welcome back
        </p>

        <div className="space-y-4 mt-8">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-4 rounded-2xl bg-slate-100 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-4 rounded-2xl bg-slate-100 outline-none"
          />

          <button
            onClick={login}
            className="
              w-full
              bg-violet-600
              hover:bg-violet-700
              text-white
              font-bold
              p-4
              rounded-2xl
              transition
            "
          >
            Login
          </button>
        </div>

        <p className="text-center mt-6 text-slate-500">
          Don’t have an account?{" "}

          <a
            href="/signup"
            className="text-violet-600 font-bold"
          >
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
}