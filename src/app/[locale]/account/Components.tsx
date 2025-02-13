"use client";

import { Button } from "@/components/ui/button";
import { trackEvent } from "@/components/TrackComponents";
import { signOut } from "@/lib/latentcat-auth/server";

export function SignOutButton({ text }: { text: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={async () => {
        trackEvent("sign_out");
        signOut();
      }}
    >
      {text}
    </Button>
  );
}
