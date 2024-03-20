import { Container } from "@/components/Containers";
import Link from "next/link";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { ModeToggle } from "@/components/ModeToggle";
import pick from "lodash/pick";
import { SectionStylesClient } from "@/app/[locale]/SectionStylesClient";
import React from "react";
import { TrackLink } from "@/components/TrackComponents";

export function Footer() {
  const t = useTranslations("footer");
  const messages = useMessages();

  return (
    <div className="_border-t py-9 lg:py-12 flex flex-col mt-12">
      <Container>
        <div className="text-sm text-muted-foreground mb-2 flex gap-4">
          <LocaleSwitcher />

          <NextIntlClientProvider messages={pick(messages, ["ModeToggle"])}>
            <ModeToggle />
          </NextIntlClientProvider>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()}{" "}
          <TrackLink
            trackValue={["latent_cat", "footer"]}
            href="https://latentcat.com"
            target="_blank"
            className="border-b"
          >
            Latent Cat
          </TrackLink>
          . {t("reserve_rights")}
        </p>
        <p className="safe-pb" />
      </Container>
    </div>
  );
}
