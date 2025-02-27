"use client";

import { PropsWithChildren, useState } from "react";
import { Button, ButtonProps } from "./ui/button";
import { trackEvent } from "./TrackComponents";
import { Loader2 } from "lucide-react";
import { NEXT_PUBLIC_QRBTF_API_ENDPOINT } from "@/lib/env/client";
import { useRouter } from "next/navigation";
export default function SignInButton(props: PropsWithChildren<ButtonProps>) {
  const { children, ...buttonProps } = props;
  const [isLogining, setLogining] = useState(false);
  const router = useRouter();
  return (
    <Button
      disabled={isLogining}
      size="sm"
      onClick={async () => {
        trackEvent("sign_in");
        setLogining(true);
        router.push(
          `${NEXT_PUBLIC_QRBTF_API_ENDPOINT}/auth/sign-in?callback=${encodeURIComponent(window.location.href)}`,
        );
      }}
      {...buttonProps}
    >
      {isLogining && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
