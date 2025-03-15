"use client";

import { useUserDataContext } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { CircleUser, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function MeProfilePage() {
  const { user } = useUserDataContext();
  return (
    <div className="px-4 flex flex-col pt-16 h-[calc(100dvh-100px)]">
      <div className="flex flex-col items-center gap-3 justify-center">
        <CircleUser className="h-16 w-16" />
        <h1 className="text-2xl">{user.name}</h1>
      </div>
      <div className="flex flex-col gap-4 mt-10">
        <div className="flex flex-col">
          <div className="text-xs font-medium">NIK</div>
          <div>{user.nik}</div>
        </div>
        <div className="flex flex-col">
          <div className="text-xs font-medium">Email</div>
          <div>{user.email}</div>
        </div>
      </div>
      <div className="grow content-end mx-auto">
        <Button
          onClick={() => {
            signOut();
          }}
          className="mt-16"
        >
          <LogOut />
          Keluar
        </Button>
      </div>
    </div>
  );
}
