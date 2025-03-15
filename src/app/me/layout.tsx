import { getAuthUser } from "@/lib/auth";
import { authCheck } from "@/lib/utils";
import MeNavbar from "./MeNavbar";

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthUser();
  authCheck(session, ["user"]);

  return (
    <div className="relative min-h-screen flex justify-center">
      {/* Wrapper dengan max-width */}
      <div className="w-full max-w-sm min-h-screen shadow-md">
        {/* <Header /> */}
        <div className="px-4">{children}</div>
        <MeNavbar />
      </div>
    </div>
  );
}
