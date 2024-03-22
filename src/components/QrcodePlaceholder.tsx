import {Card} from "@/components/ui/card";
import {Container} from "@/components/Containers";
import {useTranslations} from "next-intl";
import React, {ReactNode} from "react";
import {TrackLink} from "@/components/TrackComponents";


export function QrcodePlaceholder() {
  const t = useTranslations("qrcode_placeholder");
  return (
    <div className="mt-12">
      <Container>
        <Card className="rounded-xl">
          <div className="min-h-36 flex flex-col justify-center items-center">
            <p className="p-6 text-sm text-foreground/70 text-center">
              {t.rich("todo", {
                QrbtfClassic: (chunk: ReactNode) => (
                  <TrackLink
                    trackValue="style_to_classic"
                    href="https://classic.qrbtf.com"
                    target="_blank"
                    className="underline"
                  >
                    {chunk}
                  </TrackLink>
                ),
              })}
            </p>
          </div>
        </Card>
      </Container>
    </div>
  )
}