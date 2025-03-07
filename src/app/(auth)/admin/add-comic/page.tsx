"use client";
import { Input } from "@/lib/shadcn/components/ui/input";
import { type FormEvent } from "react";
import { authClient } from "@/lib/better-auth/auth-client";
import { api } from "@/trpc/react";
import { Button } from "@/lib/shadcn/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@/lib/shadcn/components/ui/label";

export default function AddComicPage() {
  const session = authClient.useSession();
  const mutation = api.comic.create.useMutation();
  const router = useRouter();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const name = formData.get("name")?.toString() ?? "";
    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    const price = formData.get("price")?.toString() ?? "";
    const sellerId = session.data?.user.id;
    const imageFile = formData.get("image");
    if (!sellerId) {
      return;
    }
    if (!(imageFile instanceof File)) {
      console.log("imageFile not instanceof File");
      return;
    }
    try {
      const presignedURL = await mutation.mutateAsync({
        name: name,
        price: price,
        sellerId: sellerId,
        imageName: imageFile.name,
      });
      console.log(presignedURL, "url");

      const response = await fetch(presignedURL, {
        method: "PUT",
        headers: {
          "Content-Type": imageFile.type,
        },
        body: imageFile,
      });

      if (response.ok) {
        console.log("Image uploaded successfully!");
        router.push("/admin");
      } else {
        console.error("Failed to upload image", response.statusText);
      }
    } catch (error) {
      console.error("Error during upload process:", error);
    }
  }
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <Input name="name" placeholder="Name" required />
        <Input name="price" placeholder="Price" required />
        <Label htmlFor="image">image</Label>
        <Input name="image" type="file" accept="image/*" required />
        <Button type="submit">submit</Button>
      </form>
    </div>
  );
}
