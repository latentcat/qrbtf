import { NextIntlClientProvider, useMessages } from "next-intl";
import pick from "lodash/pick";
import React from "react";

import {
  QrcodeGenerator,
  type QrcodeGeneratorProps,
} from "@/components/QrcodeGenerator";

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
