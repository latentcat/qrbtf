"use client";

import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

import { usePathname } from "next/navigation";
import { http } from "@/lib/network";
import { useSession } from "next-auth/react";

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
    http("/api/update_count", {
      method: "POST",
      body: JSON.stringify(body),
    });
  }, [pathname]);

  const { data: session } = useSession();

  let isLogout = !session || !session.user;

  useEffect(() => {
    if (!isLogout) {
      mixpanel.identify(session!.user.id);
      mixpanel.people.set({
        $name: session?.user.name,
        $email: session?.user.email,
        $avatar: session?.user.image,
      });
    } else {
      mixpanel.reset();
    }
  }, [isLogout]);

  return <></>;
}
