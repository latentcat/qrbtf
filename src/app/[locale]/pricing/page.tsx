import { Container } from "@/components/Containers";
import { HeaderPadding } from "@/components/Header";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, ChevronRight, MoveRight } from "lucide-react";
import { TrackLink } from "@/components/TrackComponents";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import auth from "@/auth";
import { getServerSession } from "next-auth/next";

function SectionTitle() {
  const t = useTranslations("pricing");
  return (
    <div>
      <Container>
        <div className="py-16 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center">{t("title")}</h1>
        </div>
      </Container>
    </div>
  );
}

interface ActionProps {
  id: string;
  label: string;
  url: string;
  target?: string;
  variant: "default" | "outline";
}

interface PricingCardProps {
  title: string;
  price: string;
  unit?: string;
  benefits?: string[];
  actions?: ActionProps[];
}

function PricingCard(props: PricingCardProps) {
  return (
    <div className="px-8 py-8 rounded-2xl border flex flex-col justify-between gap-6">
      <div>
        <h2 className="text-lg font-bold mb-1">{props.title}</h2>
        <p>
          <span className="text-3xl font-bold mr-2">{props.price}</span>
          <span className="text-xl text-foreground/50">{props.unit}</span>
        </p>
        <div className="flex flex-col gap-3 mt-6">
          {props.benefits?.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="text-background bg-foreground rounded-full p-1 scale-90">
                <Check className="w-3 h-3" strokeWidth={3} />
              </div>
              <span className="text-sm text-foreground/70">{item}</span>
            </div>
          ))}
        </div>
      </div>
      {props.actions && (
        <div className="flex gap-3 w-full">
          {props.actions.map((action, index) => (
            <TrackLink
              key={index}
              trackValue={action.id}
              href={action.url}
              target={action.target}
              className="w-full shrink"
            >
              <Button
                variant={action.variant}
                className="w-full flex justify-between items-center"
              >
                {action.label}
                <MoveRight className="h-5" />
              </Button>
            </TrackLink>
          ))}
        </div>
      )}
    </div>
  );
}

interface PricingTitleProps {
  title: string;
}

function PricingTitle(props: PricingTitleProps) {
  return (
    <div className="mb-3">
      <h2 className="text-xl font-bold">{props.title}</h2>
    </div>
  );
}

function SectionParametric() {
  const t = useTranslations("pricing.parametric");
  return (
    <div>
      <Container>
        <PricingTitle title={t("title")} />
        <div>
          <PricingCard
            title={t("p0.title")}
            price={t("p0.price")}
            benefits={[
              t("p0.benefits.0"),
              t("p0.benefits.1"),
              t("p0.benefits.2"),
              t("p0.benefits.3"),
            ]}
          />
        </div>
      </Container>
    </div>
  );
}

function SectionAI(props: { isSignIn: boolean }) {
  const t = useTranslations("pricing.ai");
  const signInOrAccount: ActionProps = props.isSignIn
    ? {
        id: "account",
        label: t("account"),
        url: "/account",
        variant: "outline",
      }
    : {
        id: "sign_in",
        label: t("sign_in"),
        url: "/signin",
        variant: "outline",
      };
  return (
    <div>
      <Container>
        <PricingTitle title={t("title")} />
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <PricingCard
            title={t("p0.title")}
            price={t("p0.price")}
            benefits={[t("p0.benefits.0"), t("p0.benefits.1")]}
            actions={[signInOrAccount]}
          />
          <PricingCard
            title={t("p1.title")}
            price={t("p1.price")}
            unit={t("p1.unit")}
            benefits={[
              t("p1.benefits.0"),
              t("p1.benefits.1"),
              t("p1.benefits.2"),
              t("p1.benefits.3"),
            ]}
            actions={[
              signInOrAccount,
              {
                id: "donate",
                label: t("donate"),
                url: "https://ko-fi.com/latentcat",
                target: "_blank",
                variant: "default",
              },
            ]}
          />
        </div>
      </Container>
    </div>
  );
}

export default async function Page() {
  const session = await getServerSession(auth);
  return (
    <div>
      <HeaderPadding />
      <SectionTitle />
      <div className="flex flex-col gap-12">
        <SectionAI isSignIn={!(!session || !session.user)} />
        <SectionParametric />
      </div>
    </div>
  );
}

export async function generateMetadata({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) {
  const t = await getTranslations({ locale, namespace: "pricing" });

  return {
    title: t("title"),
    description: t("desc"),
  };
}
