import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  Metadata,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";
import AuthButtons from "@/app/(common)/signin/AuthButtons";
import { redirect } from "next/navigation";
import { Container } from "@/components/Container";
import MenubarPadding from "@/components/MenubarPadding";
import SignInContent from "@/components/SignInContent";

export const metadata: Metadata = {
  title: "Sign In",
};

interface SignInProps {
  searchParams?: { [key: string]: string | undefined };
}

export default async function SignIn(props: SignInProps) {
  const session = await getServerSession(authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    if (props.searchParams?.callbackUrl) {
      redirect(props.searchParams?.callbackUrl);
    } else {
      redirect("/");
    }
  }

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full flex flex-col">
        <MenubarPadding />

        <div className="grow flex flex-col items-center justify-center gap-4">
          <SignInContent />
        </div>
      </div>
    </>
  );
}
