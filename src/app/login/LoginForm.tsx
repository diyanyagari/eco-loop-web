/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { fetchUserProfile, getAuthUser } from "@/lib/auth";

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
    const userProfile = await fetchUserProfile(session?.token);
    if (!session || !session.user) {
      setError("Failed to get user session");
      return;
    }

    if (userProfile?.role === "admin") {
      router.replace("/admin");
    } else {
      router.replace("/me");
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
      <motion.div
        className="w-full max-w-md p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("identifier")}
            type="text"
            placeholder="Username/NIK"
            required
          />
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            required
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

function ThemeSwitch() {
  const { setTheme, theme, systemTheme } = useTheme();
  const changeTheme = () => {
    const newTheme =
      (theme === "system" ? systemTheme : theme) === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };
  return (
    <Button onClick={changeTheme} variant="outline" size="icon">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
