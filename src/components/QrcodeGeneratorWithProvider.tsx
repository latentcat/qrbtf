import {NextIntlClientProvider, useMessages} from "next-intl";
import pick from 'lodash/pick';
import {QrcodeGenerator} from "@/components/QrcodeGenerator";
import React from "react";


interface Props {

}

export default function QrcodeGeneratorWithProvider(props: Props & React.ComponentProps<typeof QrcodeGenerator>) {

  const {namespace, ...rest} = props
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={
        pick(messages, namespace)
      }
    >
      <QrcodeGenerator namespace={namespace} {...rest} />
    </NextIntlClientProvider>
  );
}