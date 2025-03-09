import React from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import { auth } from "@/lib/better-auth/auth";
import { Button, buttonVariants } from "@/lib/shadcn/components/ui/button";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Menu, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import { SheetTrigger } from "@/lib/shadcn/components/ui/sheet";
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
        <div className="flex items-center">
          <Link
            href={"/cart"}
            className={buttonVariants({ variant: "outline" })}
          >
            <ShoppingCart />
          </Link>
        </div>
      </div>
      {!session ? (
        <>
          <Link
            href={"/sign-in"}
            className={
              "hidden sm:block" + " " + buttonVariants({ variant: "outline" })
            }
          >
            Login
          </Link>
          <Link
            href={"/sign-up"}
            className={
              "hidden sm:block" + " " + buttonVariants({ variant: "outline" })
            }
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
            <Button variant={"outline"} className="hidden sm:block">
              Sign out
            </Button>
          </form>
          <Link
            href={"/profile"}
            className={
              buttonVariants({ variant: "outline" }) + " hidden sm:flex"
            }
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
            className={
              buttonVariants({ variant: "outline" }) + " hidden sm:block"
            }
          >
            Admin
          </Link>
        </>
      ) : (
        <></>
      )}
      <SheetTrigger asChild className="cursor-pointer sm:hidden">
        <Menu />
      </SheetTrigger>
    </header>
  );
};

export default Header;
