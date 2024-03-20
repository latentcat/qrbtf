import { Container } from "@/components/Containers";
import { HeaderPadding } from "@/components/Header";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, ChevronRight, MoveRight } from "lucide-react";
import { trackEvent, TrackLink } from "@/components/TrackComponents";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import auth from "@/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "@/navigation";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { SignOutButton } from "@/app/[locale]/account/Components";
import { Progress } from "@/components/ui/progress";
import React from "react";

function PageTitle() {
  const t = useTranslations("account");
  return (
    <div>
      <Container>
        <div className="py-16 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center">{t("title")}</h1>
        </div>
      </Container>
    </div>
  );
}

interface SectionProps {
  title: string;
  children?: React.ReactNode;
}

function Section(props: SectionProps) {
  return (
    <div>
      <div className="mb-3">
        <h2 className="text-base font-bold _text-foreground/50">
          {props.title}
        </h2>
      </div>

      <Card className="w-full flex flex-col divide-y">{props.children}</Card>
    </div>
  );
}

function SectionUser(props: { user: User }) {
  const t = useTranslations("account");
  return (
    <div>
      <Container>
        <div className="w-full flex flex-col gap-6">
          <Section title={"Profile"}>
            <div className="w-full flex items-center p-3">
              <div className="grow flex items-center gap-3">
                <Avatar className="w-9 h-9 group-hover:opacity-80 transition-opacity">
                  <AvatarImage src={props.user.image || ""} />
                  <AvatarFallback>{props.user.name}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0">
                  <div className="font-semibold">{props.user.name}</div>
                  <div className="text-xs opacity-50">{props.user.email}</div>
                </div>
              </div>

              <div>
                <SignOutButton />
              </div>
            </div>
          </Section>

          <Section title={"Plan"}>
            <div className="flex flex-col gap-2 p-3">
              <div className="w-full flex items-center text-sm">
                <div className="grow flex items-center gap-3">Current Plan</div>

                <div className="text-foreground/70">2024/05/01</div>
              </div>

              <div className="text-2xl font-bold">Alpha</div>
            </div>

            <div className="flex flex-col gap-2 p-3">
              <div className="w-full flex items-center text-sm">
                <div className="grow flex items-center gap-3">Usage</div>

                <div className="text-foreground/70">10 / 10 times left</div>
              </div>

              <Progress value={70} className="h-1.5" />
            </div>
          </Section>

          <Section title={"Statistics"}>
            <div className="w-full flex items-center justify-between text-sm p-3">
              <div>Generation count</div>

              <div className="text-foreground/70">301</div>
            </div>

            <div className="w-full flex items-center justify-between text-sm p-3">
              <div>Download count</div>

              <div className="text-foreground/70">280</div>
            </div>
          </Section>
        </div>
      </Container>
    </div>
  );
}

export default async function Page() {
  const session = await getServerSession(auth);
  if (!session || !session.user) {
    redirect("/signin");
    return;
  }

  return (
    <div>
      <HeaderPadding />
      <PageTitle />
      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <SectionUser user={session.user} />
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) {
  const t = await getTranslations({ locale, namespace: "account" });

  return {
    title: t("title"),
    description: t("desc"),
  };
}
