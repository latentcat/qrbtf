import { Container } from "@/components/Containers";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("loading");

  return (
    <div className="w-full my-12">
      <Container className="w-full">
        <div className="w-full flex items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <div>{t("loading_msg")}...</div>
        </div>
      </Container>
    </div>
  );
}
