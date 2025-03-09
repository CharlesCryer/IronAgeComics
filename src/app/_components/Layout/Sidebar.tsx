import { Button, buttonVariants } from "@/lib/shadcn/components/ui/button";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
  Sheet,
} from "@/lib/shadcn/components/ui/sheet";
import { auth } from "@/lib/better-auth/auth";
import { ShoppingCart, User } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Sidebar() {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <SheetContent style={{ backgroundColor: "#ece6d6" }}>
      <SheetTitle className="flex justify-center">IronAgeComics</SheetTitle>
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center">
          <Link href={"/cart"} className={buttonVariants({ variant: "link" })}>
            <ShoppingCart />
            View Shopping Cart
          </Link>
        </div>
        {!session ? (
          <>
            <Link
              href={"/sign-in"}
              className={buttonVariants({ variant: "link" })}
            >
              Login
            </Link>
            <Link
              href={"/sign-up"}
              className={buttonVariants({ variant: "link" })}
            >
              register
            </Link>
          </>
        ) : (
          <>
            <form
              action={async () => {
                "use server";
                await auth.api.signOut({ headers: await headers() });
                redirect("/");
              }}
            >
              <Button variant={"link"}>Sign out</Button>
            </form>
            <Link
              href={"/profile"}
              className={buttonVariants({ variant: "link" })}
            >
              <User />
              Profile
            </Link>
          </>
        )}
        {session?.user.hasAdministratorPrivileges ? (
          <>
            <Link
              href={"/admin"}
              className={buttonVariants({ variant: "link" })}
            >
              Admin
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </SheetContent>
  );
}
