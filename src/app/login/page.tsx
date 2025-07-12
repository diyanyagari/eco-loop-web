import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";
import { getAuthUser } from "@/lib/auth";
import { geistSans } from "@/shared/components/fonts";

export default async function LoginPage() {
  const session = await getAuthUser();
  const roleUser = session?.user.role;

  if (session && roleUser === "user") {
    redirect("/");
  }

  if (session && roleUser === "admin") {
    redirect("/admin");
  }

  return (
    <div className={`${geistSans.className} bg-emerald-50`}>
      <div className="max-w-md mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}
