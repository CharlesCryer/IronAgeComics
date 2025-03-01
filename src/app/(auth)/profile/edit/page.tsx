"use client";
import { authClient } from "@/lib/better-auth/auth-client";
import { Button } from "@/lib/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/lib/shadcn/components/ui/card";
import { Input } from "@/lib/shadcn/components/ui/input";
import { type User } from "better-auth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EditProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    async function fetchData() {
      const user = (await authClient.getSession()).data?.user;
      if (user === undefined) {
        router.push("/sign-in");
      } else {
        setUser(user);
      }
    }
    void fetchData();
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newEmail = formData.get("email") as string;
    const newName = formData.get("name") as string;
    if (newEmail === undefined || newName === undefined) {
      alert("Unknown error occured");
      router.push("/home");
    } else {
      if (newEmail != user?.email) {
        await authClient.changeEmail({
          newEmail: newEmail,
        });
      }
      if (newName != user?.name) {
        await authClient.updateUser({
          name: newName,
        });
      }
      router.push("/profile");
    }
  }

  return (
    <div className="flex justify-center">
      <Card>
        <CardHeader>
          <div className="flex justify-center">
            <CardTitle>Edit profile information</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <Input name="name" autoComplete="name" defaultValue={user?.name} />
            <Input
              name="email"
              autoComplete="email"
              defaultValue={user?.email}
            />
            <Button type="submit" className="m-8">
              Save changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
