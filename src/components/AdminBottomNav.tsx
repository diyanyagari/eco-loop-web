/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
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
    <div className="fixed bottom-0 left-0 w-full border-t shadow-md flex justify-around px-2 pt-2 pb-8">
      <div className="w-full flex justify-around max-w-sm">
        {navItems?.map(({ name, icon: Icon, path }) => {
          const isActive = pathname === path;

          return (
            <motion.div
              key={path}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center cursor-pointer"
              onClick={() => router.push(path)}
            >
              <Button
                variant={isActive ? "default" : "ghost"}
                size="icon"
                className="rounded-full p-2"
              >
                <Icon className="w-5 h-5" />
              </Button>
              <span
                className={`text-xs mt-1 ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                {name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
