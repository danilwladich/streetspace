import type { NonFormattedStrapiImage, StrapiImage } from "./StrapiImage";

export interface NonFormattedUserType {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
  role?: {
    type: RoleTypes;
  };
  avatar: NonFormattedStrapiImage | null;
}

export interface UserType {
  id: number;
  username: string;
  email: string;
  blocked: boolean;
  role: RoleTypes;
  avatar: StrapiImage | null;
}

type RoleTypes = "user" | "admin";
