"use client";

import AdminBottomNav from "@/components/AdminBottomNav";
import { FileText, Home, User } from "lucide-react";

const navItems = [
  { name: "Beranda", icon: Home, path: "/me" },
  { name: "Transaksi", icon: FileText, path: "/me/transaksi" },
  { name: "Profil", icon: User, path: "/me/profile" },
];

export default function MeNavbar() {
  return <AdminBottomNav navItems={navItems} />;
}
