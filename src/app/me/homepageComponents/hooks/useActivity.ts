import { Activity } from "@/shared/entities/activity.entity";
import { PaginatedResponse } from "@/types/paginatedResponse";
import { useQuery } from "@tanstack/react-query";

export function useActivity() {
  return useQuery<PaginatedResponse<Activity>>({
    queryKey: ["activities"],
    queryFn: async () => {
      const res = await fetch("/api/mock/transactions");
      if (!res.ok) throw new Error("Failed to fetch activity");
      return res.json();
    },
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}
