/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RolesType } from "@/types/next-auth";
import { jwtDecode } from "jwt-decode";
import { getServerSession, JWT, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: {
          label: "email",
          type: "email",
          placeholder: "admin@example.com",
        },
        password: { label: "Password", type: "password" },
        type: { label: "Type", type: "number" },
      },

      async authorize(credentials, req) {
        const identifier = credentials?.identifier ?? "";
        const password = credentials?.password ?? "";
        const type = credentials?.type ?? "2";

        const payload = {
          identifier,
          password,
          type: parseInt(type, 10),
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await res.json();
        if (!res.ok) throw new Error(result.message);

        const token = result.data?.token;

        const decoded = jwtDecode(token) as {
          id: string;
          role: RolesType;
          email?: string;
          [key: string]: any;
        };

        return {
          ...decoded,
          accessToken: token,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
    error: "/",
  },

  callbacks: {
    async signIn({ user, account }) {
      if (!account) return false;
      if (account.provider === "google") {
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        // First time login
        token.accessToken = user.accessToken;
        token.role = user.role;
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      const typedToken = token as unknown as JWT;
      if (session.user) {
        session.user.id = typedToken.id;
        session.user.role = typedToken.role;
        session.user.accessToken = typedToken.accessToken;
        session.user.email = typedToken.email;
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const getServerAuthSessionApp = () => getServerSession(authOptions);
