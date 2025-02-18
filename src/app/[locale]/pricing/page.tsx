import { Container } from "@/components/Containers";
import { HeaderPadding } from "@/components/Header";
import { useTranslations } from "next-intl";
import { Check, MoveRight } from "lucide-react";
import { TrackLink } from "@/components/TrackComponents";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";
import { getServerSession } from "@/lib/latentcat-auth/server";
import {
  NEXT_PUBLIC_QRBTF_API_ENDPOINT,
  NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL,
} from "@/lib/env/client";
import { PaymentMethod, UserTier } from "@/lib/latentcat-auth/common";
import SignInButton from "@/components/SignInButton";

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

type ActionProps =
  | {
      id: string;
      label: string;
      url: string;
      target?: string;
      variant: "default" | "outline";
    }
  | "signIn";

interface PricingCardProps {
  title: string;
  price: string;
  unit?: string;
  benefits?: string[];
  actions?: ActionProps[];
  isCurrent: boolean;
}

async function PricingCard(props: PricingCardProps) {
  const t = await getTranslations("pricing.ai");
  const signInText = (await getTranslations("user_button"))("sign_in");
  return (
    <div className="px-8 py-8 rounded-2xl border flex flex-col justify-between gap-6">
      <div>
        <div className="flex">
          <h2 className="text-lg font-bold mb-1">
            {props.title}
            {props.isCurrent ? `(${t("current_plan")})` : ""}
          </h2>
        </div>
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
          {props.actions.map((action, index) =>
            typeof action === "object" ? (
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
            ) : (
              <div key={index} className="w-full shrink">
                <SignInButton
                  variant="outline"
                  className="w-full flex items-center"
                  key={index}
                >
                  {signInText}
                  <MoveRight className="h-5 ml-auto" />
                </SignInButton>
              </div>
            ),
          )}
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
            isCurrent={false}
          />
        </div>
      </Container>
    </div>
  );
}

function SectionAI(props: {
  userId?: string;
  userTier?: UserTier;
  userPayment?: PaymentMethod;
  credentialEmail?: string;
  paymentEmail?: string;
}) {
  const t = useTranslations("pricing.ai");

  const accountAction: ActionProps = {
    id: "account",
    label: t("account"),
    url: "/account",
    variant: "outline",
  };

  const subscribe: ActionProps = (() => {
    const url = new URL(
      `${NEXT_PUBLIC_QRBTF_API_ENDPOINT}/stripe/create-checkout-session`,
    );

    if (props.userId) url.searchParams.set("id", props.userId);
    if (props.credentialEmail)
      url.searchParams.set("email", props.credentialEmail);
    return {
      id: "subscribe",
      label: t("subscribe"),
      url: url.toString(),
      target: "_blank",
      variant: "default",
    };
  })();

  const kofi: ActionProps = {
    id: "kofi",
    label: t("manage_subscription"),
    url: "https://ko-fi.com/latentcat",
    target: "_blank",
    variant: "default",
  };

  const stripe: ActionProps = {
    id: "stripe",
    label: t("manage_subscription"),
    url: `${NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL}?prefilled_email=${encodeURI(props.paymentEmail ?? "")}`,
    target: "_blank",
    variant: "default",
  };

  const [p0Actions, p1Actions] = (() => {
    if (!props.userId) {
      return [["signIn" as const], ["signIn" as const]];
    }
    if (props.userTier !== UserTier.Pro) {
      return [[accountAction], [subscribe]];
    }
    switch (props.userPayment) {
      case PaymentMethod.None:
        return [[accountAction], [subscribe]];
      case PaymentMethod.Kofi:
        return [[], [kofi]];
      case PaymentMethod.Stripe:
        return [[], [stripe]];
      default:
        return [[], []];
    }
  })();

  return (
    <div>
      <Container>
        <PricingTitle title={t("title")} />
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <PricingCard
            title={t("p0.title")}
            price={t("p0.price")}
            benefits={[t("p0.benefits.0"), t("p0.benefits.1")]}
            actions={p0Actions}
            isCurrent={props.userTier === UserTier.Trial}
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
            actions={p1Actions}
            isCurrent={props.userTier === UserTier.Pro}
          />
        </div>
      </Container>
    </div>
  );
}

export default async function Page() {
  const session = await getServerSession();
  return (
    <div>
      <HeaderPadding />
      <SectionTitle />
      <div className="flex flex-col gap-12">
        <SectionAI
          userId={session?.id}
          userTier={session?.tier}
          userPayment={session?.payment}
          paymentEmail={session?.email}
        />
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
