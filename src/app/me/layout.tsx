// import { getAuthUser } from "@/lib/auth";
// import { authCheck } from "@/lib/utils";
import MeNavbar from "./MeNavbar";

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getAuthUser();
  // authCheck(session, ["user"]);

  return (
    <div className="relative min-h-screen max-w-md flex justify-center bg-emerald-50">
      {/* <div className="w-full max-w-sm min-h-screen overflow-y-auto pb-20"> */}
      <div className="w-full max-w-sm min-h-screen pb-20">
        {/* <div className="px-4"> */}
        <div className="">
          {children}
        </div>
        <MeNavbar />
      </div>
    </div>
  );
}
