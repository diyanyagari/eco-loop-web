import { getAuthUser } from "@/lib/auth";
import HomePage from "./home/page";
import { authCheck } from "@/lib/utils";

export default async function Home() {
  const session = await getAuthUser();
  authCheck(session, ["user"]);

  return <HomePage />;
}
