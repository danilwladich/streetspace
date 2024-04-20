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
  position: LatLng | null;
  zoom: number | null;
  userPosition: LatLng | null;
  bounds: Bounds | null;
  setLoadingUserPosition: (loadingUserPosition: boolean) => void;
  setLoadingMarkers: (loadingMarkers: boolean) => void;
  setPosition: (position: LatLng) => void;
  setZoom: (zoom: number) => void;
  setUserPosition: (userPosition: LatLng | null) => void;
  setBounds: (bounds: Bounds) => void;
}

const initialValues: {
  position?: LatLng;
  zoom?: number;
  bounds?: Bounds;
} = JSON.parse(localStorage.getItem("mapData") || "{}");

export const useMapStore = create<MapStore>((set) => ({
  loadingUserPosition: true,
  loadingMarkers: true,
  position: initialValues.position || null,
  zoom: initialValues.zoom || null,
  userPosition: null,
  bounds: initialValues.bounds || null,
  setLoadingUserPosition: (loadingUserPosition) => set({ loadingUserPosition }),
  setLoadingMarkers: (loadingMarkers) => set({ loadingMarkers }),
  setPosition: (position) => set({ position }),
  setZoom: (zoom) => set({ zoom }),
  setUserPosition: (userPosition) => set({ userPosition }),
  setBounds: (bounds) => set({ bounds }),
}));
