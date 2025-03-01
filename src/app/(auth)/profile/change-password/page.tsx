"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/lib/shadcn/components/ui/form";
import { Input } from "@/lib/shadcn/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/lib/shadcn/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/better-auth/auth-client";
import { useRouter } from "next/navigation";

const changePasswordFormSchema = z
  .object({
    oldPasswordInput: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(50, { message: "Password cannot exceed 50 characters" }),
    newPasswordInput: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(50, { message: "Password cannot exceed 50 characters" }),
    confirmPasswordInput: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(50, { message: "Password cannot exceed 50 characters" }),
  })
  .superRefine(
    ({ oldPasswordInput, newPasswordInput, confirmPasswordInput }, ctx) => {
      if (newPasswordInput !== confirmPasswordInput) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords do not match",
          path: ["confirmPasswordInput"], // Attach error to confirmPasswordInput
        });
      }
      if (newPasswordInput == oldPasswordInput) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Your new password cannot be the same as your old password",
          path: ["newPasswordInput"],
        });
      }
    },
  );
export default function ChangePasswordPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      oldPasswordInput: "",
      newPasswordInput: "",
      confirmPasswordInput: "",
    },
  });
  async function onSubmit(values: z.infer<typeof changePasswordFormSchema>) {
    setIsSubmitting(true);
    const { oldPasswordInput, newPasswordInput } = values;
    await authClient.changePassword(
      {
        newPassword: newPasswordInput,
        currentPassword: oldPasswordInput,
        revokeOtherSessions: true,
      },
      {
        onError: (ctx) => {
          if (ctx.error.code == "INVALID_PASSWORD") {
            form.setError("oldPasswordInput", {
              type: "manual",
              message: "Incorrect password.",
            });
            setIsSubmitting(false);
          } else {
            alert("Unknown error occured, please try again later");
            router.refresh();
          }
        },
        onSuccess: () => {
          router.push("/home");
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="oldPasswordInput"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your current password"
                  type="password"
                  autoComplete="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPasswordInput"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your new password"
                  type="password"
                  autoComplete="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPasswordInput"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm</FormLabel>
              <FormControl>
                <Input
                  placeholder="Re-enter your new password"
                  type="password"
                  autoComplete="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          <Loader2
            className={`animate-spin ${isSubmitting ? "block" : "hidden"}`}
          />
          Submit
        </Button>
      </form>
    </Form>
  );
}
