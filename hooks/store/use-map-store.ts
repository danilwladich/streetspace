import { create } from "zustand";
import type { LatLng } from "leaflet";

export const MAP_MIN_ZOOM = 2;
export const MAP_INPUT_MIN_ZOOM = 16;
export const MAP_ICON_SIZE = 40;

export interface Bounds {
  latMin: number;
  latMax: number;
  lngMin: number;
  lngMax: number;
}

interface MapStore {
  loadingUserPosition: boolean;
  position: LatLng | null;
  zoom: number | null;
  userPosition: LatLng | null;
  bounds: Bounds | null;
  isInput: boolean;
  setLoadingUserPosition: (loadingUserPosition: boolean) => void;
  setPosition: (position: LatLng) => void;
  setZoom: (zoom: number) => void;
  setUserPosition: (userPosition: LatLng | null) => void;
  setBounds: (bounds: Bounds) => void;
  setIsInput: (isInput: boolean) => void;
}

const initialValues: {
  position?: LatLng;
  zoom?: number;
  bounds?: Bounds;
} = JSON.parse(localStorage.getItem("mapData") || "{}");

export const useMapStore = create<MapStore>((set) => ({
  loadingUserPosition: true,
  position: initialValues.position || null,
  zoom: initialValues.zoom || null,
  userPosition: null,
  bounds: initialValues.bounds || null,
  isInput: false,
  setLoadingUserPosition: (loadingUserPosition) => set({ loadingUserPosition }),
  setPosition: (position) => set({ position }),
  setZoom: (zoom) => set({ zoom }),
  setUserPosition: (userPosition) => set({ userPosition }),
  setBounds: (bounds) => set({ bounds }),
  setIsInput: (isInput) => set({ isInput }),
}));
