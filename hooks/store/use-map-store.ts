import { create } from "zustand";
import type { LatLng } from "leaflet";
import type { Marker } from "@prisma/client";

export const MAP_MIN_ZOOM = 4;
export const MAP_INPUT_MIN_ZOOM = 16;
export const MAP_ICON_SIZE = 40;

export interface Bounds {
  latMin: number;
  latMax: number;
  lngMin: number;
  lngMax: number;
}

interface MapStore {
  markers: Marker[];
  loadingUserPosition: boolean;
  loadingMarkers: boolean;
  position: LatLng | null;
  zoom: number | null;
  userPosition: LatLng | null;
  bounds: Bounds | null;
  searchIsVisible: boolean;
  isInput: boolean;
  setMarkers: (markers: Marker[]) => void;
  setLoadingUserPosition: (loadingUserPosition: boolean) => void;
  setLoadingMarkers: (loadingMarkers: boolean) => void;
  setPosition: (position: LatLng) => void;
  setZoom: (zoom: number) => void;
  setUserPosition: (userPosition: LatLng | null) => void;
  setBounds: (bounds: Bounds) => void;
  setSearchIsVisible: (searchIsVisible: boolean) => void;
  setIsInput: (isInput: boolean) => void;
}

const initialValues: {
  position?: LatLng;
  zoom?: number;
  bounds?: Bounds;
} = JSON.parse(localStorage.getItem("mapData") || "{}");

export const useMapStore = create<MapStore>((set) => ({
  markers: [],
  loadingUserPosition: true,
  loadingMarkers: true,
  position: initialValues.position || null,
  zoom: initialValues.zoom || null,
  userPosition: null,
  bounds: initialValues.bounds || null,
  searchIsVisible: false,
  isInput: false,
  setMarkers: (markers) => set({ markers }),
  setLoadingUserPosition: (loadingUserPosition) => set({ loadingUserPosition }),
  setLoadingMarkers: (loadingMarkers) => set({ loadingMarkers }),
  setPosition: (position) => set({ position }),
  setZoom: (zoom) => set({ zoom }),
  setUserPosition: (userPosition) => set({ userPosition }),
  setBounds: (bounds) => set({ bounds }),
  setSearchIsVisible: (searchIsVisible) => set({ searchIsVisible }),
  setIsInput: (isInput) => set({ isInput }),
}));
