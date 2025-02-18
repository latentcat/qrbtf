"use client";

import { PropsWithChildren, useState } from "react";
import { Button, ButtonProps } from "./ui/button";
import { trackEvent } from "./TrackComponents";
import { signIn } from "@/lib/latentcat-auth/server";
import { Loader2 } from "lucide-react";

export default function SignInButton(props: PropsWithChildren<ButtonProps>) {
  const { children, ...buttonProps } = props;
  const [isLogining, setLogining] = useState(false);
  return (
    <Button
      disabled={isLogining}
      size="sm"
      onClick={async () => {
        trackEvent("sign_in");
        setLogining(true);
        await signIn();
      }}
      {...buttonProps}
    >
      {isLogining && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
