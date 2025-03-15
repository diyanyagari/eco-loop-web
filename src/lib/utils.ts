import { QueryClient } from "@tanstack/react-query";
import { clsx, type ClassValue } from "clsx";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const authCheck = (session: Session | null, allowedRoles: string[]) => {
  const userRole = session?.user.role || "";

  if (!session) {
    return redirect("/login");
  }

  if (!session || !allowedRoles.includes(userRole ?? "")) {
    console.log(`Redirecting: User Role '${userRole}' is not allowed`);
    return redirect("/no-access");
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000, // 5 seconds
      refetchOnWindowFocus: false,
    },
  },
});
