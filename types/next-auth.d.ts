/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth/next";

export type RolesType = "admin" | "user" | "hipopotamus" | "alien";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      role: RolesType;
      accessToken: string;
    };
  }

  interface User {
    id: string;
    name?: string;
    email?: string;
    role: RolesType;
    accessToken: string;
  }

  interface JWT {
    id: string;
    name?: string;
    email?: string;
    role: RolesType;
    accessToken: string;
  }
}
