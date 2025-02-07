"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/shadcn/components/ui/card";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/shadcn/components/ui/form";
import { Input } from "@/lib/shadcn/components/ui/input";
import { Button } from "@/lib/shadcn/components/ui/button";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/better-auth/auth-client";

export const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(2)
    .max(50),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(50, { message: "Password cannot exceed 50 characters" }),
});

const signUpFormSchema = formSchema.pick({
  name: true,
  email: true,
  password: true,
});

export default function SignUp() {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    const { name, email, password } = values;
    await authClient.signUp.email(
      {
        email: email,
        name: name,
        password: password,
        callbackURL: "/sign-in",
      },
      {
        onRequest: (ctx) => {
          console.log("request", ctx);
        },
        onSuccess: (ctx) => {
          console.log("success", ctx);
        },
        onError: (ctx) => {
          console.log("error", ctx);
        },
      },
    );
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create your account to get started.</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="john doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-muted-foreground text-sm">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
