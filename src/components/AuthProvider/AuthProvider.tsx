"use client";

import { fetchUserProfile } from "@/lib/auth";
import { useSession } from "next-auth/react";
import React from "react";
import LoadingGlobal from "../LoadingGlobal";
import { UserDataContextProvider, UserInterface } from "./context";

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

  React.useEffect(() => {
    const getUserData = async () => {
      if (!session) return;
      const token = session?.token;

      const userData = await fetchUserProfile(token);
      setUser({
        id: userData?.id,
        name: userData?.name,
        role: userData?.role,
        email: userData?.email,
        nik: userData?.nik,
      });
    };

    getUserData();
  }, [session]);

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
