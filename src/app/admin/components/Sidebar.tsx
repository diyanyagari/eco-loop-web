"use client";

import Link from "next/link";
import { BookUser, DatabaseZap, Home, Users } from "lucide-react";
import { SvgEarthLeaf } from "@/shared/components/SvgComponents";
import { usePathname } from "next/navigation";
import { cns } from "@/utils/class-merge";

const navItems = [
  { name: "Dashboard", icon: Home, path: "/admin" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Family", icon: BookUser, path: "/admin/family" },
  { name: "Bank Sampah", icon: DatabaseZap, path: "/admin/bank-sampah" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 fixed top-0 h-full bg-emerald-500 text-black p-4 pr-0 flex flex-col gap-10">
      <div className="flex flex-row items-center gap-4 justify-center pr-4">
        <SvgEarthLeaf className="h-10 w-10" />
        <h4 className="font-medium tracking-wider">EcoLoop</h4>
      </div>
      <nav className="space-y-4 rounded-l-2xl py-4 overflow-hidden">
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={cns("block relative px-4 py-2", {
                "font-semibold text-emerald-700 bg-white rounded-l-full relative after:content-[''] after:absolute after:right-0 after:-top-4 after:rounded-br-4xl after:shadow-[5px_5px_0_5px_rgb(255,255,255)] after:h-4 after:w-4 after:bg-emerald-500 before:content-[''] before:absolute before:right-0 before:-bottom-4 before:rounded-tr-4xl before:shadow-[5px_-5px_0_5px_rgb(255,255,255)] before:h-4 before:w-4 before:bg-emerald-500":
                  isActive,
                "font-normal text-gray-70 hover:scale-105 hover:font-semibold transition-all duration-300 ease-in-out origin-left":
                  !isActive,
              })}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
