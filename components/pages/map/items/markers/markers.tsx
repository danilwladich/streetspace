"use client";

import useSupercluster from "use-supercluster";
import { useMap } from "react-leaflet";
import type { ConfirmedMarker } from "@/types/marker";

import Marker from "./marker";
import Cluster from "./cluster";

export default function Markers({ markers }: { markers: ConfirmedMarker[] }) {
  const map = useMap();

  const points = markers.map((marker) => ({
    type: "Feature" as const,
    properties: { cluster: false, point_count: 0, ...marker },
    geometry: {
      type: "Point" as const,
      coordinates: [marker.lng, marker.lat],
    },
  }));

  const bounds = map.getBounds();
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds: [
      bounds.getSouthWest().lng,
      bounds.getSouthWest().lat,
      bounds.getNorthEast().lng,
      bounds.getNorthEast().lat,
    ],
    zoom: map.getZoom(),
    options: { radius: 75, maxZoom: 20 },
  });

  return clusters.map((cluster) => {
    const [lng, lat] = cluster.geometry.coordinates;
    const { cluster: isCluster, point_count: pointCount } = cluster.properties;

    if (isCluster) {
      return (
        <Cluster
          key={`cluster-${cluster.id}`}
          lat={lat}
          lng={lng}
          pointCount={pointCount}
          totalCount={points.length}
          onClick={(e) => {
            if (!supercluster) {
              return;
            }

            const expansionZoom = Math.min(
              supercluster.getClusterExpansionZoom(Number(cluster.id)),
              17,
            );
            map.setView(e.latlng, expansionZoom, {
              animate: true,
            });
          }}
        />
      );
    }

    return (
      <Marker key={`marker-${cluster.properties.id}`} {...cluster.properties} />
    );
  });
}
