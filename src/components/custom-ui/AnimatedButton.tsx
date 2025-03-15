"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function AnimatedButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
      <Button onClick={onClick}>{children}</Button>
    </motion.div>
  );
}
