import type { NonFormattedStrapiImage, StrapiImage } from "./StrapiImage";
import type { NonFormattedUserType, UserType } from "./UserType";
import type { NonFormattedStrapiArray } from "./StrapiArray";

export interface NonFormattedMarkerType {
  id: number;
  lat: number;
  lng: number;
  confirmed: boolean;
  name: string;
  address: string;
  createdAt: Date;
  images: NonFormattedStrapiArray<NonFormattedStrapiImage>;
  addedBy: {
    data: {
      id: 1;
      attributes: Omit<NonFormattedUserType, "id">;
    };
  } | null;
}

export interface MarkerType {
  id: number;
  lat: number;
  lng: number;
  confirmed: boolean;
  name: string;
  address: string;
  createdAt: Date;
  images: StrapiImage[];
  addedBy: UserType | null;
}
