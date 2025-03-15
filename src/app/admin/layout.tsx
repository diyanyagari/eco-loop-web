import { getAuthUser } from "@/lib/auth";
import { authCheck } from "@/lib/utils";
import Header from "./Header";
import AdminNavbar from "./AdminNavbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthUser();
  authCheck(session, ["admin"]);

  return (
    <div className="relative min-h-screen flex justify-center">
      {/* Wrapper dengan max-width */}
      <div className="w-full max-w-sm min-h-screen shadow-md">
        <Header />
        <div className="px-4">{children}</div>
        <AdminNavbar />
      </div>
    </div>
  );
}
