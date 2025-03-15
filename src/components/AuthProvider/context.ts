"use client";

import { createContext, useContext } from "react";

export interface UserInterface {
  id: string;
  role: string;
  name: string;
  nik: string;
  email: string;
}

export interface UserDataContextProps {
  user: UserInterface;
  // setUser: (e: React.SetStateAction<UserInterface>) => void;

  gLoading: boolean;
  setGLoading: (e: React.SetStateAction<boolean>) => void;
}

const UserDataContext = createContext<UserDataContextProps | null>(null);

export const UserDataContextProvider = UserDataContext.Provider;

export const useUserDataContext = () => {
  const ctx = useContext(UserDataContext);

  if (!ctx) {
    const NAME = "User Data";
    throw new Error(
      `"${NAME}.*" component must be rendered as a child inside the "${NAME}" component.`
    );
  }

  return ctx;
};
