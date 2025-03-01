import { auth } from "@/lib/better-auth/auth";
import { buttonVariants } from "@/lib/shadcn/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/lib/shadcn/components/ui/card";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import React from "react";
import Link from "next/link";

const ProfilePage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (session === null) {
    redirect("/sign-in");
  }
  const user = session.user;
  return (
    <div className="flex justify-center">
      <Card>
        <CardHeader>
          <div className="flex justify-center">
            <CardTitle>Profile information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={"/profile/edit"}
          >
            Edit profile
          </Link>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={"/profile/change-password"}
          >
            Change password
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
