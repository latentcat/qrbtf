import { NextIntlClientProvider, useMessages } from "next-intl";
import pick from "lodash/pick";

import { SectionStylesClient } from "@/app/[locale]/SectionStylesClient";

export function SectionStyles() {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, ["index.style"])}>
      <SectionStylesClient />
    </NextIntlClientProvider>
  );
}
