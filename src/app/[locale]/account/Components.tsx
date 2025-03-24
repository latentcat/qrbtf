"use client";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/components/TrackComponents";
import { NEXT_PUBLIC_ACCOUNT_URL } from "@/lib/env/client";
import { useRouter } from "next/navigation";

export function SignOutButton({ text }: { text: string }) {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        trackEvent("sign_out");
        router.push(
          `${NEXT_PUBLIC_ACCOUNT_URL}/logout?callback=${encodeURIComponent(
            window.location.href,
          )}`,
        );
      }}
    >
      {text}
    </Button>
  );
}
