"use client";

import AdminBottomNav from "@/components/AdminBottomNav";
import { FileClock, Home, UserRound } from "lucide-react";

const navItems = [
  { name: "Home", icon: Home, path: "/me" },
  { name: "Setoran", icon: FileClock, path: "/me/transaksi" },
  { name: "Akun", icon: UserRound, path: "/me/profile" },
];

export default function MeNavbar() {
  return <AdminBottomNav navItems={navItems} />;
}
