"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

import { AtSign, KeyRound } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import Link from "next/link";

// Zod schema for validation
const schema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .nonempty("Password is required"),
});

export function LoginForm({ customUrl }) {
  const { toast } = useToast();
  const [intialize, setInitialize] = useState(false);

  // initialize form
  useEffect(() => {
    setInitialize(true);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      // credentials error
      if (result?.error) {
        if (result?.error === "CredentialsSignin") {
          toast({
            variant: "destructive",
            title: "Email or Password Incorect",
          });
        }
        return;
      }

      if (result?.ok) {
        setTimeout(() => {
          router.push(customUrl ?? "/dashboard");
        }, 500);

        // success toast
        if (!customUrl) {
          toast({
            title: "Redirecting to dashboard page",
          });
        }
      }
    } catch (error) {
      console.log(error);

      // const err = new CredentialsSignin(error);
      // console.log(err.message);

      // setError(error.message || "An unexpected error occurred");
    }
  };
  if (intialize) {
    return (
      <div
        className={`space-y-4 bg-white border rounded-xl shadow-md w-full max-w-fit sm:max-w-md pb-8 ${
          isSubmitting && "cursor-wait"
        }`}
      >
        <div className="bg-white  rounded-t-xl border-b py-4 px-8">
          <img src="/assets/images/SiteLogo.png" />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`space-y-4 bg-white px-8 py-4 `}
        >
          {/* Email Input */}
          <div>
            <h3 className=" font-semibold text-xl">
              Log In or{" "}
              <Link href={"/user/signup"} className=" underline">
                Sign Up
              </Link>
            </h3>
            <sub className="text-[#5a5a5a]">
              Login into your account using your email.
            </sub>
          </div>
          <div>
            <label
              htmlFor="email"
              className=" flex items-center bg-white shadow-md border p-1 px-2 rounded-md"
            >
              <AtSign className="text-[#5A5A5A] size-4" />
              <input
                placeholder={"Email ID"}
                type="email"
                id="email"
                {...register("email")}
                autoComplete="off"
                className="mt-1  py-2 px-3 focus:outline-none bg-white placeholder:bg-white text-base"
              />
            </label>
            {errors.email && (
              <p className="text-sm text-red-600 pt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="flex items-center bg-white shadow-md border p-1 px-2 rounded-md"
            >
              <KeyRound className="text-[#5A5A5A] size-4" />
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register("password")}
                autoComplete="off"
                className="mt-1  py-2 px-3 focus:outline-none bg-white placeholder:bg-white text-base"
              />
            </label>
            {errors.password && (
              <p className="text-sm text-red-600 p-2">
                {errors.password.message}
              </p>
            )}
          </div>
          <Link className="pt-2 block" href={"/user/forgot-password"}>
            Forgot Password ?
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-4 rounded-md ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-secondaryDark hover:bg-secondarylight text-white"
            }`}
          >
            {isSubmitting ? "Logging in..." : "Continue"}
          </Button>
        </form>
        <div className="hidden">
          <div className="flex justify-center gap-4 items-center">
            <hr className="w-full" />
            <span className="text-sm text-nowrap text-[#667085]">
              Or continue with
            </span>
            <hr className="w-full" />
          </div>

          <div className="flex items-center justify-around px-8 pb-8 gap-4 pt-4 font-semibold flex-wrap">
            <button
              onClick={() => signIn("google")}
              className="flex w-fit items-center rounded-md p-2 gap-4 shadow border px-8 text-Nileblue"
            >
              <img src="/assets/images/google.png" className="size-4" />
              Google
            </button>
            <button className="flex w-fit items-center rounded-md p-2 gap-4 shadow border px-8 text-Nileblue">
              <img src="/assets/images/facebook.png" className="size-4" />
              Facebook
            </button>
          </div>
        </div>
      </div>
    );
  }
}
