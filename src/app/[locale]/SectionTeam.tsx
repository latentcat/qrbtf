import { useTranslations } from "next-intl";
import { Container } from "@/components/Containers";
import { SectionTitle } from "@/components/Titles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Fragment } from "react";
import Link from "next/link";
import { TrackLink } from "@/components/TrackComponents";

const links = [
  {
    name: "Latent Cat",
    url: "https://latentcat.com",
  },
  {
    name: "@ciaochaos",
    url: "https://github.com/ciaochaos",
  },
  {
    name: "@cpunisher",
    url: "https://github.com/cpunisher",
  },
  {
    name: "@chenbaiyujason",
    url: "https://github.com/chenbaiyujason",
  },
  {
    name: "@zhaohan-wang",
    url: "https://github.com/zhaohan-wang",
  },
];

export function SectionTeam() {
  const t = useTranslations("index.team");

  return (
    <div className="">
      <SectionTitle title={t("title")} subtitle={t("subtitle")} />

      <div className="mt-6 leading-7">
        {links.map((item, index) => (
          <Fragment key={item.name}>
            <TrackLink
              trackValue={["team_member", item.name]}
              href={item.url}
              target="_blank"
              className="text-foreground underline font-medium"
            >
              {item.name}
            </TrackLink>
            {index < links.length - 1 && <>, </>}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
