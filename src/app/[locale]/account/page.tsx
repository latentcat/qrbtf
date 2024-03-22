import { Container } from "@/components/Containers";
import { HeaderPadding } from "@/components/Header";
import { useFormatter, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import auth, { UserTier } from "@/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "@/navigation";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "next-auth";
import { SignOutButton } from "@/app/[locale]/account/Components";
import { Progress } from "@/components/ui/progress";
import React from "react";
import { getUserQrcodeStat } from "@/app/api/user/stat/service";

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

interface SectionUserProps {
  user: User;
  generationCount: number;
  downloadCount: number;
  dailyUsage: number;
  maxDailyUsage: number;
}

function SectionUser(props: SectionUserProps) {
  const t = useTranslations("account");
  const formatter = useFormatter();
  const tUserButton = useTranslations("user_button");

  return (
    <div>
      <Container>
        <div className="w-full flex flex-col gap-6">
          <Section title={t("profile")}>
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
                <SignOutButton text={tUserButton("sign_out")} />
              </div>
            </div>
          </Section>

          <Section title={t("plan")}>
            <div className="flex flex-col gap-2 p-3">
              <div className="w-full flex items-center text-sm">
                <div className="grow flex items-center gap-3">
                  {t("current_plan")}
                </div>
                <div className="text-foreground/70">
                  {props.user.tier === UserTier.Trial ||
                  !props.user.subscribe_expire
                    ? ""
                    : formatter.dateTime(props.user.subscribe_expire, {
                        dateStyle: "short",
                      })}
                </div>
              </div>

              <div className="text-2xl font-bold">
                {UserTier[props.user.tier || 0]}
              </div>
            </div>

            <div className="flex flex-col gap-2 p-3">
              <div className="w-full flex items-center text-sm">
                <div className="grow flex items-center gap-3">{t("usage")}</div>

                <div className="text-foreground/70">
                  {props.user.tier === UserTier.Trial
                    ? `${props.dailyUsage} / ${props.maxDailyUsage} ${t("refreshed")}`
                    : t("unlimited")}
                </div>
              </div>

              <Progress
                value={
                  props.user.tier === UserTier.Trial
                    ? (100 * props.dailyUsage) / props.maxDailyUsage
                    : 0
                }
                className="h-1.5"
              />
            </div>
          </Section>

          <Section title={t("statistics")}>
            <div className="w-full flex items-center justify-between text-sm p-3">
              <div>{t("generation_count")}</div>
              <div className="text-foreground/70">{props.generationCount}</div>
            </div>

            <div className="w-full flex items-center justify-between text-sm p-3">
              <div>{t("download_count")}</div>
              <div className="text-foreground/70">{props.downloadCount}</div>
            </div>
          </Section>
        </div>
      </Container>
    </div>
  );
}

export default async function Page() {
  const session = await getServerSession(auth);
  if (!session || !session.user || !session.user.id) {
    redirect("/signin");
    return;
  }

  const userQrcodeStat = await getUserQrcodeStat(session.user.id);

  return (
    <div>
      <HeaderPadding />
      <PageTitle />
      <div className="flex flex-col items-center">
        <div className="w-full max-w-2xl">
          <SectionUser
            user={session.user}
            downloadCount={userQrcodeStat?.download_count ?? 0}
            generationCount={userQrcodeStat?.generation_count ?? 0}
            dailyUsage={userQrcodeStat?.usage_count ?? 0}
            maxDailyUsage={10}
          />
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
