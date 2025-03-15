"use client";

import AdminBottomNav from "@/components/AdminBottomNav";
import { BookUser, DatabaseZap, Home, Users } from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: Home, path: "/admin" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Family", icon: BookUser, path: "/admin/family" },
  { name: "Bank Sampah", icon: DatabaseZap, path: "/admin/bank-sampah" },
];

export default function AdminNavbar() {
  return <AdminBottomNav navItems={navItems} />;
}
