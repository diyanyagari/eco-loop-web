import { AnimatedButton } from "@/components/custom-ui/AnimatedButton";
import { getAuthUser } from "@/lib/auth";
import { authCheck } from "@/lib/utils";
import AdminNavbar from "./AdminNavbar";

export default async function AdminPage() {
  const session = await getAuthUser();
  authCheck(session, ["admin"]);

  return (
    <div>
      Admin Dashboard
      <div className="flex min-h-screen items-center justify-center">
        <AnimatedButton>Click Me</AnimatedButton>
        <AdminNavbar />
      </div>
    </div>
  );
}
