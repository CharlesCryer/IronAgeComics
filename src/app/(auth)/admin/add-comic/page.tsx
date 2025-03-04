"use client";
import { Input } from "@/lib/shadcn/components/ui/input";
import { FormEvent } from "react";
import { authClient } from "@/lib/better-auth/auth-client";
import { api } from "@/trpc/react";
import { Button } from "@/lib/shadcn/components/ui/button";
import { useRouter } from "next/navigation";

export default function AddComicPage() {
  const session = authClient.useSession();
  const mutation = api.comic.create.useMutation();
  const router = useRouter();
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString() ?? "";
    const price = formData.get("price")?.toString() ?? "";
    const sellerId = session.data?.user.id;
    if (!sellerId) {
      return;
    }
    mutation.mutate({
      name: name,
      price: price,
      sellerId: sellerId,
    });
    router.push("/admin");
  }
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <Input name="name" placeholder="Name" required />
        <Input name="price" placeholder="Price" required />
        <Button type="submit">submit</Button>
      </form>
    </div>
  );
}
