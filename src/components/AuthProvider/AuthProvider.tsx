"use client";

import { fetchUserProfile } from "@/lib/auth";
import { useSession } from "next-auth/react";
import React from "react";
import LoadingGlobal from "../LoadingGlobal";
import { UserDataContextProvider, UserInterface } from "./context";
import { useQuery } from "@tanstack/react-query";

interface UserDataProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: UserDataProviderProps) {
  const { data: session } = useSession();
  const [gLoading, setGLoading] = React.useState(false);
  const [user, setUser] = React.useState<UserInterface>({
    id: "",
    role: "",
    name: "",
    email: "",
    nik: "",
  });

  // React.useEffect(() => {
  //   const getUserData = async () => {
  //     if (!session) return;
  //     const token = session?.token;

  //     const userData = await fetchUserProfile(token);
  //     setUser({
  //       id: userData?.id,
  //       name: userData?.name,
  //       role: userData?.role,
  //       email: userData?.email,
  //       nik: userData?.nik,
  //     });
  //   };

  //   getUserData();
  // }, [session]);

  // Fetch user profile using react-query (cached)
  const { data: userData } = useQuery({
    queryKey: ["userProfile", session?.token],
    queryFn: async () => {
      setGLoading(true);
      const data = await fetchUserProfile(session?.token);
      setGLoading(false);
      return data;
    },
    enabled: !!session?.token,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Update state only if user data changes
  React.useEffect(() => {
    if (userData && JSON.stringify(userData) !== JSON.stringify(user)) {
      setUser(userData);
    }
  }, [userData]);

  return (
    <UserDataContextProvider
      value={{
        user,
        gLoading,
        setGLoading,
      }}
    >
      {children}
      {gLoading && <LoadingGlobal />}
    </UserDataContextProvider>
  );
}
