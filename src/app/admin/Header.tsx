"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Header() {
  return (
    <div className="w-full px-4 pt-5">
      <Button
        onClick={() => {
          signOut();
        }}
      >
        <LogOut className="rotate-180" />
      </Button>
    </div>
  );
}
