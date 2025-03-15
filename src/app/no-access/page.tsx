import { getAuthUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import BackToHome from "./BackToHome";

export default async function NoAccessPage() {
  const session = await getAuthUser();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-10">
        <h1 className="text-xl font-bold">🚫 No Access</h1>
        <p>{session.user.role}</p>
        <BackToHome />
      </div>
    </div>
  );
}
