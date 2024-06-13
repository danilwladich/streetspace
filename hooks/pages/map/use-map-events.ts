import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useMapStore, type Bounds } from "@/hooks/store/use-map-store";
import { type LeafletEvent } from "leaflet";

export function useMapEvents() {
  const { setBounds, setZoom, setPosition, setSearchIsVisible } = useMapStore();

  const map = useMap();

  useEffect(() => {
    function onMoveEnd(e: LeafletEvent) {
      const b = e.target.getBounds().toBBoxString().split(",");
      const currentBounds: Bounds = {
        latMin: parseFloat(b[1]),
        latMax: parseFloat(b[3]),
        lngMin: parseFloat(b[0]),
        lngMax: parseFloat(b[2]),
      };
      setBounds(currentBounds);

      setPosition(e.target.getCenter());
      setZoom(e.target.getZoom());

      setSearchIsVisible(true);

      localStorage.setItem(
        "mapData",
        JSON.stringify({
          position: e.target.getCenter(),
          zoom: e.target.getZoom(),
          bounds: currentBounds,
        }),
      );
    }

    map.on("moveend", onMoveEnd);

    return () => {
      map.off("moveend", onMoveEnd);
    };
  }, [map, setBounds, setPosition, setZoom]);
}
