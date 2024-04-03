import type { NonFormattedStrapiImage, StrapiImage } from "./StrapiImage";

export interface NonFormattedUserType {
  id: number;
  username: string;
  email: string;
  role?: {
    type: RoleTypes;
  };
  avatar: NonFormattedStrapiImage | null;
}

export interface UserType {
  id: number;
  username: string;
  email: string;
  role: RoleTypes;
  avatar: StrapiImage | null;
}

type RoleTypes = "user" | "admin";
