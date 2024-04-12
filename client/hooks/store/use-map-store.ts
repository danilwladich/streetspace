import type { LatLng } from "leaflet";
import { create } from "zustand";

export const MAP_ICON_SIZE = 40;

export interface Bounds {
  latMin: number;
  latMax: number;
  lngMin: number;
  lngMax: number;
}

interface MapStore {
  loadingUserPosition: boolean;
  loadingMarkers: boolean;
  userPosition: LatLng | null;
  bounds: Bounds | null;
  setLoadingUserPosition: (loadingUserPosition: boolean) => void;
  setLoadingMarkers: (loadingMarkers: boolean) => void;
  setUserPosition: (userPosition: LatLng | null) => void;
  setBounds: (bounds: Bounds) => void;
}

const initialValues: { userPosition?: LatLng; bounds?: Bounds } = JSON.parse(
  localStorage.getItem("mapData") || "{}",
);

export const useMapStore = create<MapStore>((set) => ({
  loadingUserPosition: true,
  loadingMarkers: true,
  userPosition: initialValues.userPosition || null,
  bounds: initialValues.bounds || null,
  setLoadingUserPosition: (loadingUserPosition) => set({ loadingUserPosition }),
  setLoadingMarkers: (loadingMarkers) => set({ loadingMarkers }),
  setUserPosition: (userPosition) => set({ userPosition }),
  setBounds: (bounds) => set({ bounds }),
}));
