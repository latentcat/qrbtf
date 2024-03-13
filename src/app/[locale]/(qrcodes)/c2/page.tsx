import {NextIntlClientProvider, useMessages} from "next-intl";
import pick from 'lodash/pick';


export default function Page() {
  // Receive messages provided in `i18n.ts` …
  const messages = useMessages();

  return (
    <NextIntlClientProvider
      messages={
        // … and provide the relevant messages
        pick(messages, 'ClientCounter')
      }
    >
      <div></div>
    </NextIntlClientProvider>
  );
}