import type { Map } from "leaflet";

import UserLocation from "./user-location";
import FetchMarkers from "./fetch-markers";
import InputMarker from "./input-marker";
import ZoomControls from "./zoom-controls";

export default function MapControls({
  map,
  singleMarker = false,
}: {
  map: Map;
  singleMarker?: boolean;
}) {
  return (
    <>
      <div className="absolute left-2 top-2 z-10 flex flex-col gap-1 md:bottom-2 md:top-auto">
        {!singleMarker && <InputMarker map={map} />}

        {!singleMarker && <UserLocation map={map} />}

        <ZoomControls map={map} />
      </div>

      {!singleMarker && <FetchMarkers />}
    </>
  );
}
