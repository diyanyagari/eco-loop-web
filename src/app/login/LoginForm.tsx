/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ThemeSwitch from "./ThemeSwitch";

type LoginFormValues = {
  identifier: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [viewportHeight, setViewportHeight] = useState("100vh");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: loading },
  } = useForm<LoginFormValues>({ mode: "onChange" });

  const onSubmit = async (data: LoginFormValues) => {
    const res = await signIn("credentials", {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });
    if (res?.error) {
      const errorMsg =
        res?.status === 401 ? "incorrect username or password" : res.error;
      setError(errorMsg);
      console.error(errorMsg);
      return;
    }

    const session = await getSession();
    if (!session || !session.user) {
      setError("Failed to get user session");
      return;
    }

    const isNik = /^\d{16}$/.test(data.identifier);

    if (isNik) {
      router.replace("/me");
    } else {
      router.replace("/admin");
    }
  };

  useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(`${window.innerHeight}px`);
    };
    window.addEventListener("resize", updateHeight);
    updateHeight();
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: viewportHeight }}
    >
      <div className="absolute right-4 top-4">
        <ThemeSwitch />
      </div>
      <div className="w-full max-w-md p-6 rounded-lg shadow-sm animate-fadeInUp will-change-transform">
        <h2 className="text-xl font-semibold text-center">Login</h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("identifier")}
            type="text"
            placeholder="Username/NIK"
            required
            autoComplete="off"
          />
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            required
            autoComplete="off"
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
