"use client";

import { signIn, signOut, useSession } from "next-auth/react";
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
import { Link } from "@/navigation";
import { ArrowUpRightIcon, HomeIcon } from "lucide-react";

const iconClass = "w-4 h-4 mr-2.5 opacity-100";

export function AuthButton() {
  const { data: session } = useSession();
  const hasSession = session !== null && session !== undefined;
  if (!hasSession) {
    return (
      <div className="pointer-events-auto">
        <Button
          size="sm"
          onClick={async () => {
            // track("sign_in");
            await signIn();
          }}
        >
          Sign in
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
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback>{session?.user?.name}</AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuItem>
              <div className="flex gap-3 items-center">
                <Avatar className="w-9 h-9 group-hover:opacity-80 transition-opacity">
                  <AvatarImage src={session?.user?.image || ""} />
                  <AvatarFallback>{session?.user?.name}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0">
                  <div className="font-semibold">{session?.user?.name}</div>
                  <div className="text-xs opacity-50">
                    {session?.user?.email}
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
            {/*<DropdownMenuSeparator />*/}
            {/*<DropdownMenuGroup>*/}
            {/*  <Link href={"/user/" + session?.user?.id}>*/}
            {/*    <DropdownMenuItem>*/}
            {/*      <HomeIcon className={iconClass} />*/}
            {/*      My homepage*/}
            {/*    </DropdownMenuItem>*/}
            {/*  </Link>*/}
            {/*</DropdownMenuGroup>*/}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await signOut();
                // track("sign_out");
              }}
              className="text-red-500"
            >
              <ArrowUpRightIcon className={iconClass} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }
}
