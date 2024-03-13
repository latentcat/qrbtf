import {Container} from "@/components/Containers";
import Link from "next/link";
import {useTranslations} from "next-intl";


export function Footer() {
  const t = useTranslations('footer');

  return (
    <div className="_border-t py-9 lg:py-12 flex flex-col">
      <Container>
        <p className="text-sm text-zinc-400 dark:text-zinc-500">
          &copy; {new Date().getFullYear()} {" "}
          <Link href="https://latentcat.com" target="_blank" className="border-b">
            Latent Cat
          </Link>. {t('reserve_rights')}
        </p>
        <p className="safe-pb" />
      </Container>
    </div>
  )
}