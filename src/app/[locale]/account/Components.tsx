"use client";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/components/TrackComponents";
import { NEXT_PUBLIC_QRBTF_API_ENDPOINT } from "@/lib/env/client";
import { http } from "@/lib/network";
import { useRouter } from "next/navigation";

export function SignOutButton({ text }: { text: string }) {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        trackEvent("sign_out");
        await http(`${NEXT_PUBLIC_QRBTF_API_ENDPOINT}/auth/sign-out`, {
          method: "POST",
        });
        router.refresh();
      }}
    >
      {text}
    </Button>
  );
}
