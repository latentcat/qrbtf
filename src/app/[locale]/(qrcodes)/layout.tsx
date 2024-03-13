import {SectionHero} from "@/app/[locale]/SectionHero";
import {SectionStyles} from "@/app/[locale]/SectionStyles";
import {SectionParams} from "@/app/[locale]/SectionParams";


export default function RootLayout({
                                     children,
                                     params: {locale}
                                   }: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  return (
    <div>
      <SectionHero/>
      <SectionStyles/>
      {children}
    </div>
  );
}
