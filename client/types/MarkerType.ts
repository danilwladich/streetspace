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
  type: MarkerTypeEnum;
  createdAt: Date;
  images: NonFormattedStrapiArray<NonFormattedStrapiImage>;
  addedBy: {
    data: {
      id: 1;
      attributes: Omit<NonFormattedUserType, "id">;
    };
  };
}

export interface MarkerType {
  id: number;
  lat: number;
  lng: number;
  confirmed: boolean;
  name: string;
  address: string;
  type: MarkerTypeEnum;
  createdAt: Date;
  images: StrapiImage[];
  addedBy: UserType;
}

export enum MarkerTypeEnum {
  Street = "Street",
  Gym = "Gym",
}
