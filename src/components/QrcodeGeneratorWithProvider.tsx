import {NextIntlClientProvider, useMessages} from "next-intl";
import pick from 'lodash/pick';
import {QrcodeGenerator} from "@/components/QrcodeGenerator";
import React from "react";


interface Props<P extends {}> extends React.ComponentProps<typeof QrcodeGenerator<P>> {

}

export default function QrcodeGeneratorWithProvider<P extends {}>(props: Props<P>) {

  const {...rest} = props
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={
        pick(messages, ["index.params"])
      }
    >
      <QrcodeGenerator {...rest} />
    </NextIntlClientProvider>
  );
}