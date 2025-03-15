/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth/next";

type RolesType = "admin" | "customer" | "hipopotamus" | "alien";

declare module "next-auth" {
  // interface Session {
  //   expires: string;
  //   username: string;
  //   email: string;
  //   firstname: string;
  //   lastname: string;
  //   role: RolesType;
  //   iat: number;
  //   exp: number;
  //   jti: string;
  //   user: {
  //     exp: number;
  //     iat: number;
  //     jti: string;
  //     aud: string;
  //     token?: string;
  //     email?: string;
  //     id?: string;
  //     name?: string;
  //     picture?: string;
  //     sub?: string;
  //     username: string;
  //     phone: string;
  //     role: RolesType;
  //   };
  // }

  // interface DefaultJWT {
  //   data?: {
  //     token?: string;
  //     user?: object;
  //   };
  //   iat: number;
  //   exp: number;
  //   jti: string;
  // }

  interface Session {
    // role: RolesType;
    // user: {
    //   userId: string;
    //   access: string;
    //   iat: number;
    //   exp: number;
    //   token: string;
    //   role: string;
    // };
    token: string;
    user: {
      id: string;
      name: string;
      role: string;
    };
  }
}
