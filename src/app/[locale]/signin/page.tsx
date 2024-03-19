import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import authOptions from "@/auth";
import SignInContent from "./SignInContent";
import { redirect } from "next/navigation";
import AuthButtons from "./AuthButtons";

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
        <AuthButtons />
        <div className="grow flex flex-col items-center justify-center gap-4">
          <SignInContent />
        </div>
      </div>
    </>
  );
}
