import { authOptions } from "@/next-auth/next-auth";
import { getServerSession } from "next-auth";

export const getAuthUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.token) return null;

  const userProfile = await fetchUserProfile(session.token);
  if (!userProfile) return null;

  return {
    ...session,
    user: {
      ...session.user,
      ...userProfile,
    },
  };
};

export async function fetchUserProfile(token: string | undefined) {
  if (!token) return null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/get-profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 300 },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch profile");

    const data = await res.json();
    return {
      id: data.data.id,
      name: data.data.name,
      role: data.data.role,
      nik: data.data.nik,
      email: data.data.email,
    };
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
}
