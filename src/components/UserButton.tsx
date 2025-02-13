"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUpRightIcon, HomeIcon, Loader2, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { trackEvent, TrackLink } from "@/components/TrackComponents";
import { useSession } from "@/lib/latentcat-auth/client";
import { signIn, signOut } from "@/lib/latentcat-auth/server";
import { useState } from "react";

const iconClass = "w-4 h-4 mr-2.5 opacity-100";

export function UserButton() {
  const t = useTranslations("user_button");

  const { data: session } = useSession();
  const [isLogining, setLogining] = useState(false);
  const hasSession = session !== null && session !== undefined;

  if (!hasSession) {
    return (
      <div className="pointer-events-auto">
        <Button
          disabled={isLogining}
          size="sm"
          onClick={async () => {
            trackEvent("sign_in");
            setLogining(true);
            await signIn();
          }}
        >
          {isLogining && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t("sign_in")}
        </Button>
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
              onClick={() => {
                trackEvent("sign_out");
                signOut();
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
