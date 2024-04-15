import type { Metadata } from "next";
import { getAppTitle } from "@/lib/get-app-title";
import { getUnconfirmedMarkers } from "@/lib/server-actions";

import { Marker } from "@/components/pages/admin/marker";

export const metadata: Metadata = {
  title: getAppTitle("admin"),
};

export default async function Admin() {
  const markers = await getUnconfirmedMarkers();

  if (!markers) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <h2 className="text-center text-xl">
          An error occurred while fetching markers
        </h2>
      </div>
    );
  }

  if (!markers.data.length) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <h2 className="text-center text-xl">No unconfirmed markers</h2>
      </div>
    );
  }

  return markers.data.map((m) => <Marker {...m} />);
}
