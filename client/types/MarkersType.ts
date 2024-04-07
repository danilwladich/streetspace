import type { NonFormattedStrapiImages, StrapiImage } from "./StrapiImage";
import type { NonFormattedUserType, UserType } from "./UserType";

export interface NonFormattedMarkersType {
  data: {
    id: number;
    attributes: {
      lat: number;
      lng: number;
      confirmed: boolean;
      name: string;
      address: string;
      createdAt: Date;
      images: NonFormattedStrapiImages;
      addedBy: {
        data: {
          id: 1;
          attributes: NonFormattedUserType;
        };
      };
    };
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface MarkersType {
  data: MarkerType[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
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
  addedBy: UserType;
}
