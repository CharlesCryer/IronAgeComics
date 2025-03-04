import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CurrentListings from "./listings";

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user.hasAdministratorPrivileges) {
    redirect("/home");
  }
  return <CurrentListings userId={session.user.id} />;
}
