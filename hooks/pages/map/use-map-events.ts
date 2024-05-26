import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { useMapStore, type Bounds } from "@/hooks/store/use-map-store";

export function useMapEvents() {
  const { setBounds, setZoom, setPosition, setSearchIsVisible } = useMapStore();

  const map = useMap();

  useEffect(() => {
    map.on("moveend", (e) => {
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
    });

    return () => {
      map.off();
    };
  }, [map, setBounds, setPosition, setZoom]);
}
