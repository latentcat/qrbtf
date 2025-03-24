"use client";

import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

import { usePathname } from "next/navigation";
import { http } from "@/lib/network";
import { useSession } from "@/lib/latentcat-auth/client";
import { NEXT_PUBLIC_QRBTF_API_ENDPOINT } from "@/lib/env/client";

const body = {
  collection_name: "counter_global",
  name: "page_view",
};

export default function MixpanelAnalytics() {
  useEffect(() => {
    mixpanel.init("02948b6369bba242c60d9483e873025d", {
      // debug: true,
      // track_pageview: true,
      persistence: "localStorage",
      api_host: "/mp",
    });

    // mixpanel.track_links("a", "click link", {
    //   "referrer": document.referrer
    // });
  }, []);

  const pathname = usePathname();

  useEffect(() => {
    mixpanel.track_pageview();
    http(`${NEXT_PUBLIC_QRBTF_API_ENDPOINT}/count/update_count`, {
      method: "POST",
      body: JSON.stringify(body),
    });
  }, [pathname]);

  const { data: session } = useSession();

  let isLogout = !session;

  useEffect(() => {
    if (!isLogout) {
      mixpanel.identify(session!.id);
      mixpanel.people.set({
        $name: session?.name,
        // $email: session?.user.email,
        $avatar: session?.image,
      });
    } else {
      mixpanel.reset();
    }
  }, [isLogout, session]);

  return <></>;
}
