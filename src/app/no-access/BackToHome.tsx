"use client";

import { useUserDataContext } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { House, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
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
    <div className="flex flex-col gap-4">
      <Button onClick={onClick} variant="ghost">
        <House />
        Kembali
      </Button>
      <Button onClick={() => signOut()} variant="ghost">
        <LogOut />
        Logout
      </Button>
    </div>
  );
}
