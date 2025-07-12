import { Category } from "@/shared/entities/category.entity";
import { PaginatedResponse } from "@/types/paginatedResponse";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  return useQuery<PaginatedResponse<Category>>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/mock/category");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
