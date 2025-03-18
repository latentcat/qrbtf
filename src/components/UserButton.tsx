"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpRightIcon, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { trackEvent, TrackLink } from "@/components/TrackComponents";
import { useSession } from "@/lib/latentcat-auth/client";
import SignInButton from "./SignInButton";
import { NEXT_PUBLIC_ACCOUNT_URL } from "@/lib/env/client";
import { useRouter } from "next/navigation";
const iconClass = "w-4 h-4 mr-2.5 opacity-100";

export function UserButton() {
  const t = useTranslations("user_button");
  const router = useRouter();

  const { data: session } = useSession();
  const hasSession = session !== null && session !== undefined;

  if (!hasSession) {
    return (
      <div className="pointer-events-auto">
        <SignInButton>{t("sign_in")}</SignInButton>
      </div>
    );
  }

  if (session) {
    return (
      <div className="pointer-events-auto">
        <DropdownMenu>
          {/* eslint-disable-next-line react/jsx-no-undef */}
          <DropdownMenuTrigger asChild className="group">
            <div className="py-1">
              <Avatar className="w-9 h-9 group-hover:opacity-80 transition-opacity">
                <AvatarImage src={session?.picture || ""} />
                <AvatarFallback>{session?.name}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuItem>
              <div className="flex gap-3 items-center">
                <Avatar className="w-9 h-9 group-hover:opacity-80 transition-opacity">
                  <AvatarImage src={session?.picture || ""} />
                  <AvatarFallback>{session?.name}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0">
                  <div className="font-semibold">{session?.name}</div>
                  {/* <div className="text-xs opacity-50">
                    {session?.user?.email}
                  </div> */}
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <TrackLink
                trackValue={["user_button", "account"]}
                href="/account"
              >
                <DropdownMenuItem>
                  <UserRound className={iconClass} />
                  {t("account")}
                </DropdownMenuItem>
              </TrackLink>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                trackEvent("sign_out");
                router.push(
                  `${NEXT_PUBLIC_ACCOUNT_URL}/logout?callback=${encodeURIComponent(
                    window.location.href,
                  )}`,
                );
              }}
              className="text-red-500"
            >
              <ArrowUpRightIcon className={iconClass} />
              {t("sign_out")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
}
