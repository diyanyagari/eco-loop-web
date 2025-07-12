/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SvgEarthLeaf,
  SvgFacebook,
  SvgGoogle,
} from "@/shared/components/SvgComponents";
import { cns } from "@/utils/class-merge";
import { getSession, signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OnboardingPage from "./OnboardingPage";

type LoginFormValues = {
  identifier: string;
  password: string;
};

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const ONE_DAY_MS = 1 * 24 * 60 * 60 * 1000;

const getShouldShowOnboarding = () => {
  const complete = localStorage.getItem("onboardingComplete");
  const timestamp = localStorage.getItem("onboardingTimestamp");
  console.log("aaaaaa-> ", complete, timestamp);

  if (!complete || !timestamp) return true;

  const diff = Date.now() - new Date(timestamp).getTime();
  if (diff > ONE_DAY_MS) {
    // Time expired — clear localStorage and show onboarding again
    localStorage.removeItem("onboardingComplete");
    localStorage.removeItem("onboardingTimestamp");
    return true;
  }

  return false;
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

  React.useEffect(() => {
    const updateHeight = () => {
      setViewportHeight(`${window.innerHeight}px`);
    };
    window.addEventListener("resize", updateHeight);
    updateHeight();
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const shouldShow = getShouldShowOnboarding();
    setShowOnboarding(shouldShow);
  }, []);

  if (showOnboarding) {
    return <OnboardingPage onHandleClick={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-emerald-50 p-6">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex flex-col items-center">
          <SvgEarthLeaf className="h-20 w-20" />
          <h1 className="mt-1 text-2xl font-bold text-gray-800">
            {showSignUp ? "Buat Akunmu" : "Selamat Datang!"}
          </h1>
          <p className="text-gray-500 text-sm text-center">
            {showSignUp
              ? "Bergabung dengan komunitas daur ulang kami dan mulai perjalananmu."
              : "Yuk Mulai Daur Ulang"}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              {...register("identifier")}
              type="text"
              placeholder="Username/NIK"
              required
              className="rounded-full border-emerald-100 bg-emerald-50 px-4 py-6 text-black placeholder:text-black"
              autoComplete="off"
            />
          </div>

          <div>
            <Input
              {...register("password")}
              className="rounded-full border-emerald-100 bg-emerald-50 px-4 py-6"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!showSignUp && (
            <div className="text-right">
              <button type="button" className="text-sm text-emerald-500">
                Lupa Kata Sandi?
              </button>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className={cns(
              "w-full rounded-full  py-6 text-lg text-white font-medium",
              {
                "bg-gray-500": loading,
                "bg-emerald-500 hover:bg-emerald-600": !loading,
              }
            )}
          >
            {showSignUp ? "Bergabung" : "Masuk"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {showSignUp ? "Sudah punya akun? " : "Belum punya akun? "}
            <button
              type="button"
              className="font-medium text-emerald-500"
              onClick={() => setShowSignUp(!showSignUp)}
            >
              {showSignUp ? "Masuk" : "Bergabung"}
            </button>
          </p>
        </div>

        {!showSignUp && (
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">
                  atau masuk dengan
                </span>
              </div>
            </div>

            <div className="mt-4 flex justify-center space-x-4">
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200">
                <SvgGoogle className="h-4 w-4" />
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200">
                <SvgFacebook className="h-4 w-4 text-[#1877F2]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
