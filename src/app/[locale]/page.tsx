import Image from "next/image";
import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('index');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        {t('hero.title')}
      </div>
    </main>
  );
}
