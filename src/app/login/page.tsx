import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { getAuthUser } from "@/lib/auth";

export default async function LoginPage() {
  const session = await getAuthUser();
  const roleUser = session?.user.role;

  if (session && roleUser === "user") {
    redirect("/");
  }

  if (session && roleUser === "admin") {
    redirect("/admin");
  }

  return <LoginForm />;
}
