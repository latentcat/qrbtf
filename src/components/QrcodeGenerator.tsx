"use client"

import {NamespaceKeys, NestedKeyOf, useTranslations} from "next-intl";
import {Container} from "@/components/Containers";


type Namespace = NamespaceKeys<IntlMessages, NestedKeyOf<IntlMessages>>

interface QrcodeGeneratorProps {
  namespace: Namespace
}

export function QrcodeGenerator(props: QrcodeGeneratorProps) {
  const t = useTranslations(props.namespace);
  return (
    <div>
      <Container>
        <div>
          <h2 className="mt-9 mb-4 text-2xl font-bold">
            {t('title')}
          </h2>
        </div>
      </Container>
    </div>
  )
}