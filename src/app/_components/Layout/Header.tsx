import React from "react";
import SearchBar from "./SearchBar";
import ViewCartButton from "./ViewCartButton";
import Link from "next/link";
import { auth } from "@/lib/better-auth/auth";
import { Button } from "@/lib/shadcn/components/ui/button";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { User } from "lucide-react";
import Image from "next/image";
const Header = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return (
    <header
      className="flex items-center justify-between gap-2 p-2 px-[10%]"
      style={{ backgroundColor: "#e14620" }}
    >
      <Link href={"/home"} className="relative h-24 w-24">
        <Image src="/headerLogo.png" fill alt="No image available" />
      </Link>
      <SearchBar />
      <div className="hidden items-center sm:flex">
        <ViewCartButton />
      </div>
      {!session ? (
        <>
          <Link href={"/sign-in"} className="hidden sm:block">
            Login
          </Link>
          <Link href={"/sign-up"} className="hidden sm:block">
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
            <Button>Sign out</Button>
          </form>
          <Link href={"/profile"} className="flex">
            <Button>
              <User />
              Profile
            </Button>
          </Link>
        </>
      )}
      {session?.user.hasAdministratorPrivileges ? (
        <>
          <Link href={"/admin"} className="flex">
            <Button>Admin</Button>
          </Link>
        </>
      ) : (
        <></>
      )}
      <button className="sm:hidden">sidebar</button>
    </header>
  );
};

export default Header;
