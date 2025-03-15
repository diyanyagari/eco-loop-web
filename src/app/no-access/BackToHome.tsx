"use client";

import { useUserDataContext } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackToHome() {
  const { user } = useUserDataContext();
  const router = useRouter();

  const onClick = () => {
    if (user.role === "admin") {
      router.replace("/admin");
      return;
    }
    router.replace("/me");
  };
  return (
    <Button onClick={onClick} variant="ghost">
      <House />
      Kembali
    </Button>
  );
}
