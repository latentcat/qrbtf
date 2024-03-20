import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { Container } from "@/components/Containers";
import { TrackLink } from "@/components/TrackComponents";

export default function NotFound() {
  const t = useTranslations("not_found");
  return (
    <div className="flex w-full h-full justify-center items-center pt-32 sm:pt-48 pb-16">
      <Container>
        <div className="flex flex-col items-center">
          <p className="text-base font-semibold text-zinc-400 dark:text-zinc-500">
            404
          </p>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            {t("tagline")}
          </p>
          <TrackLink href="/" trackValue="not_found_go_home">
            <Button variant="secondary" className="mt-6">
              {t("home")}
            </Button>
          </TrackLink>
        </div>
      </Container>
    </div>
  );
}
