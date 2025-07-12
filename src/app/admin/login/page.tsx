"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SvgEarthLeaf } from "@/shared/components/SvgComponents";
import { cns } from "@/utils/class-merge";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type LoginFormValues = {
  identifier: string;
  password: string;
};

export default function AdminLogin() {
  const router = useRouter();

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
      type: 1,
    });
    if (res?.error) {
      console.error(
        res?.status === 401 ? "Username atau kata sandi salah" : res.error
      );
      return;
    }

    const session = await getSession();
    if (!session?.user) {
      console.error("Gagal mendapatkan sesi pengguna");
      return;
    }

    router.replace("/admin");
  };

  return (
    <div className="fixed left-0 top-0 h-dvh w-full">
      <div className="flex relative flex-row items-end h-full">
        <div className="w-3/5 h-full">
          <div className="relative h-full w-full">
            <Image
              src="/images/forest.jpg"
              fill
              alt="background-path"
              style={{ objectFit: "cover" }}
            />
            <div className="absolute left-0 right-0 w-full h-full bg-black/10 backdrop-blur-xs" />
          </div>
        </div>
        <div className="w-2/5 h-full bg-emerald-50 flex px-10 items-center justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl px-6 py-8 w-full flex flex-col gap-5"
          >
            <div className="mb-4 flex flex-col items-center">
              <SvgEarthLeaf className="h-20 w-20" />
              <h1 className="mt-1 text-2xl font-bold text-gray-800">
                Selamat Datang!
              </h1>
            </div>
            <div>
              <Input
                {...register("identifier")}
                type="text"
                placeholder="Username"
                required
                className="rounded-full border-emerald-100 bg-emerald-50 px-4 py-6 text-black placeholder:text-black"
                autoComplete="off"
              />
              {errors.identifier && (
                <p className="text-sm text-red-500 mt-1">
                  Username wajib diisi.
                </p>
              )}
            </div>

            <div>
              <Input
                {...register("password")}
                className="rounded-full border-emerald-100 bg-emerald-50 px-4 py-6 text-black placeholder:text-black"
                type="password"
                placeholder="Password"
                required
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  Kata sandi wajib diisi.
                </p>
              )}
            </div>

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
              Masuk
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
