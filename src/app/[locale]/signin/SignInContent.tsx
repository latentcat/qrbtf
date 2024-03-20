import AuthButtons from "@/app/[locale]/signin/AuthButtons";
import { Link } from "@/navigation";
import { TranslationValues, useTranslations } from "next-intl";
import React, { ReactNode } from "react";
import { TrackLink } from "@/components/TrackComponents";

export default function SignInContent() {
  const t = useTranslations("signin");

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-96 max-w-full p-6">
      <h1 className="text-2xl font-bold mb-2">{t("title")}</h1>

      <div className="relative w-full">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {/*Or continue with*/}
            <div className="w-1 h-1 bg-border rounded-full"></div>
          </span>
        </div>
      </div>

      <AuthButtons />
      <div className="text-sm opacity-50 text-center">
        {t.rich("desc", {
          TermOfService: (chunk: ReactNode) => (
            <TrackLink
              trackValue={["terms_of_service", "sign_in"]}
              href="/terms-of-service"
              className="underline"
            >
              {chunk}
            </TrackLink>
          ),
          PrivacyPolicy: (chunk: ReactNode) => (
            <TrackLink
              trackValue={["privacy_policy", "sign_in"]}
              href="/privacy-policy"
              className="underline"
            >
              {chunk}
            </TrackLink>
          ),
        })}
      </div>
    </div>
  );
}
