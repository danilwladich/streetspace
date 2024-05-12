import { getUnconfirmedMarkers } from "@/services/marker";
import { getTranslations } from "next-intl/server";

import NotFound from "@/components/common/not-found";
import { Marker } from "@/components/pages/admin/markers/marker";

export default async function Markers() {
  const t = await getTranslations("pages.admin.markers");

  const markers = await getUnconfirmedMarkers();

  if (!markers.length) {
    return <NotFound text={t("notFound")} />;
  }

  return markers.map((m) => <Marker key={m.id} {...m} />);
}
