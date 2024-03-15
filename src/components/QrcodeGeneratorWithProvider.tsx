import { NextIntlClientProvider, useMessages } from "next-intl";
import pick from "lodash/pick";
import {
  QrcodeGenerator,
  QrcodeGeneratorProps,
} from "@/components/QrcodeGenerator";
import React from "react";

export default function QrcodeGeneratorWithProvider<P extends {}>(
  props: QrcodeGeneratorProps<P>,
) {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={pick(messages, ["index.params"])}>
      <QrcodeGenerator {...props} />
    </NextIntlClientProvider>
  );
}
