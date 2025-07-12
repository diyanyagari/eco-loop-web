/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { cns } from "@/utils/class-merge";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";

interface AdminBottomNavProps {
  name: string;
  icon: any;
  path: string;
}

export default function AdminBottomNav({
  navItems,
}: {
  navItems: AdminBottomNavProps[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 bg-white w-full border-t shadow-md flex justify-around px-2 pt-2 pb-8">
      <div className="w-full flex justify-around max-w-sm">
        {navItems?.map(({ name, icon: Icon, path }) => {
          const isActive = pathname === path;

          return (
            <div
              key={path}
              onClick={() => router.push(path)}
              className="flex flex-col items-center cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className=""
              >
                <Button
                  size="icon"
                  className={cns(
                    "flex h-full w-full flex-col items-center justify-center bg-white hover:bg-white",
                    isActive ? "text-emerald-500" : "text-gray-400"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </Button>
              </motion.div>
              <span
                className={`text-xs mt-1 ${
                  isActive ? "text-emerald-500" : "text-gray-400"
                }`}
              >
                {name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
