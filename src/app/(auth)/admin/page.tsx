import AdminComics from "@/app/_components/AdminPage/AdminComics";
import { auth } from "@/lib/better-auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function AdminPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user.id) {
    redirect("/sign-in");
  }
  return <AdminComics userId={session.user.id} />;
}
