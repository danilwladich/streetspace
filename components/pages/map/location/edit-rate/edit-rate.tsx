import { getTranslations } from "next-intl/server";
import { getAuthMarkerRate } from "@/services/marker-rate";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import RateButtons from "./rate-buttons";

export default async function EditRate({
  id,
  avg,
}: {
  id: string;
  avg: number;
}) {
  const t = await getTranslations("pages.map.rate");

  const authRate = await getAuthMarkerRate(id);

  return (
    <Card className="max-w-4xl">
      <CardHeader>
        <CardTitle>
          <h3>{t("title")}</h3>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="inline-flex items-center [&>button:hover~button]:text-current [&>button:hover~button_svg]:fill-none [&>button]:hover:text-yellow-400 [&>button_svg]:hover:fill-yellow-400">
          <RateButtons id={id} avg={avg} authRate={authRate} />
        </div>
      </CardContent>
    </Card>
  );
}
