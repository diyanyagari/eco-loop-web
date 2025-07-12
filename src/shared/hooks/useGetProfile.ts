import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

const BASE_URL_GET_PROFILE = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/get-profile`;

export const useGetProfile = (token?: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["get-profile"],
    enabled: !!token && enabled,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    retry: 1,
    queryFn: async () => {
      try {
        const res = await fetch(BASE_URL_GET_PROFILE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            signOut();
          }
        }

        return res.json();
      } catch (err) {
        console.error("Profile fetch error:", err);
        throw err;
      }
    },
  });
};
