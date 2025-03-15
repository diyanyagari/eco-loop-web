/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwtD, { JwtPayload } from "jsonwebtoken";
import { getServerSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const AUTH_BASE_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/google`;

export const authOptions: NextAuthOptions = {
  // Authentication providers for NextAuth
  providers: [
    /**
     * Custom login provider using credentials (identifier and password).
     *
     * Provides custom login functionality using the 'credentials' provider.
     * It accepts the identifier (email) and password, and verifies these
     * against an internal API to authenticate the user.
     *
     * @type {CredentialsProvider}
     */
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
      },

      /**
       * Authorizes the user based on the provided credentials.
       *
       * This function sends a POST request with the user credentials to the
       * specified internal authentication endpoint. If the user is successfully
       * authenticated, the user data is returned. Otherwise, it throws an error.
       *
       * @async
       * @param {Record<'identifier' | 'password', string>} credentials - The login credentials provided by the user.
       * @param {NextApiRequest} req - The API request object.
       * @returns {Promise<object | null>} The authenticated user object or null if authentication fails.
       * @throws {Error} If authentication fails (e.g., invalid credentials).
       */
      async authorize(credentials, req) {
        const identifier = credentials?.identifier ?? "";
        const password = credentials?.password ?? "";

        // Check if identifier is all digits (NIK)
        const isNik = /^\d{16}$/.test(identifier);

        const payload = {
          identifier,
          password,
          type: isNik ? 2 : 1,
        };

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
              "Content-Type": "application/json",
              //   ASL: process.env.NEXT_PUBLIC_ASL_HEADER ?? "",
            },
          }
        );

        const user = await res.json();
        if (!res.ok) {
          throw new Error(user.message);
        }

        if (res.ok && user) {
          return user;
        }
      },
    }),
  ],

  /**
   * Custom pages configuration for authentication.
   *
   * This specifies the custom login page URL that will be shown for user sign-in.
   *
   * @type {object}
   */
  pages: {
    signIn: "/login",
    error: "/",
  },

  /**
   * Callbacks for customizing the JWT and session management.
   */
  callbacks: {
    async signIn({ user, account }) {
      if (!account) return false;
      if (account.provider === "google") {
      }
      return true;
    },

    /**
     * JWT callback.
     *
     * This callback allows you to modify the token returned after the user
     * logs in. The `token` contains the existing token, and `user` contains
     * the user object returned from the authorize function. It combines the
     * user data with the token.
     *
     * @param {object} params
     * @param {object} params.token - The existing token object.
     * @param {object} [params.user] - The user object returned from the authorize function.
     * @param {object} [params.account] - The account details from the provider (e.g., Google).
     * @returns {Promise<object>} The updated token object with user information.
     */
    async jwt({ token, user }) {
      // if (!token.accessToken) return {};

      // const res = await fetch(
      //   `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/check-token`,
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ token: token.accessToken }),
      //   }
      // );

      // console.log('huhuhuhuh', res)

      // if (!res.ok) {
      //   return {}; // Logout user kalau token udah expired atau gak valid
      // }

      // return token;
      return { ...token, ...user };
    },

    /**
     * Session callback.
     *
     * This callback modifies the session object returned to the client,
     * attaching the token information to the `session.user` field.
     *
     * @param {object} params
     * @param {object} params.session - The session object containing the user's session data.
     * @param {object} params.token - The token object containing user and session information.
     * @param {object} [params.user] - The user object (if available).
     * @returns {Promise<object>} The updated session object.
     */
    async session({ session, token, user }) {
      const modifySession = { ...session };
      const typedToken = token as { data: { token: string } };
      modifySession.token = typedToken.data.token;
      return modifySession;
    },
  },

  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const getServerAuthSessionApp = () => getServerSession(authOptions);
