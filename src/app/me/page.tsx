import { getAuthUser } from "@/lib/auth";
import MeHomePage from "./HomeMe";
import { authCheck } from "@/lib/utils";

export default async function UserPage() {
  const session = await getAuthUser();
  authCheck(session, ["user"]);

  return (
    <div>
      <MeHomePage />
    </div>
  );
}
