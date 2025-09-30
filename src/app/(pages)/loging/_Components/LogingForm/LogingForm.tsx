"use client";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { email, z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";

import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.email("invalid").nonempty({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string("invalid")
    .nonempty({
      message: "Please enter a valid Password address.",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@\(!\)!%*?&]).{6,}$/,
      "invalid Pass"
    ),
});

type FormFields = z.infer<typeof formSchema>;

export function LoginForm() {
  let searchParms = useSearchParams();

  const router = useRouter();

  const callbackUrl = searchParms.get("callback-url");

  //   console.log(searchParms.get('error'));
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormFields) {
    const response = await signIn("credentials", {
      callbackUrl: callbackUrl ?? "/",
      email: values.email,
      password: values.password,
    });
    // console.log(response);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>

              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>

              <FormControl>
                <button
                  onClick={() => router.push("/ForgetPass")}
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
