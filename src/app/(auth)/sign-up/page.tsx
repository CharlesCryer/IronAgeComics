"use client";
import { Loader2 } from "lucide-react";
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

import { type z } from "zod";
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
import formSchema from "../form-schema";
import { useState } from "react";
import { useRouter } from "next/navigation";

const signUpFormSchema = formSchema.pick({
  name: true,
  email: true,
  password: true,
});

export default function SignUp() {
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    setIsSubmitting(true);
    const { name, email, password } = values;
    await authClient.signUp.email(
      {
        email: email,
        name: name,
        password: password,
        callbackURL: "/sign-in",
      },
      {
        onRequest: undefined,
        onSuccess: () => {
          router.push("/sign-in");
        },
        onError: (ctx) => {
          if (ctx.error.code === "USER_ALREADY_EXISTS") {
            alert("User already exists");
          } else {
            alert("Unknown error occured, please try again");
          }
          router.refresh();
          setIsSubmitting(false);
        },
      },
    );
  }

  return (
    <Card className="mx-auto my-24 w-full max-w-md">
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
                    <Input
                      placeholder="john doe"
                      autoComplete="name"
                      {...field}
                    />
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
                    <Input
                      placeholder="john@mail.com"
                      autoComplete="email"
                      {...field}
                    />
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
                      autoComplete="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              <Loader2
                className={`animate-spin ${isSubmitting ? "block" : "hidden"}`}
              />
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
