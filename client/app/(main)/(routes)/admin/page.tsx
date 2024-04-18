import type { Metadata } from "next";
import { getAppTitle } from "@/lib/get-app-title";
import { getUnconfirmedMarkers } from "@/services/marker";

import NotFound from "@/components/common/not-found";
import { Marker } from "@/components/pages/admin/marker";

export const metadata: Metadata = {
  title: getAppTitle("admin"),
};

export default async function Admin() {
  const markers = await getUnconfirmedMarkers();

  if (!markers.length) {
    return <NotFound text="No unconfirmed markers" />;
  }

  return markers.map((m) => <Marker key={m.id} {...m} />);
}
