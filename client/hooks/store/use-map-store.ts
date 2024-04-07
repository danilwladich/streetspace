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
  userPosition: LatLng | null;
  bounds: Bounds | null;
  setUserPosition: (userPosition: LatLng) => void;
  setBounds: (bounds: Bounds) => void;
}

const initialValues: { userPosition?: LatLng; bounds?: Bounds } = JSON.parse(
  localStorage.getItem("mapData") || "{}",
);

export const useMapStore = create<MapStore>((set) => ({
  userPosition: initialValues.userPosition || null,
  bounds: initialValues.bounds || null,
  setUserPosition: (userPosition) => set({ userPosition }),
  setBounds: (bounds) => set({ bounds }),
}));
