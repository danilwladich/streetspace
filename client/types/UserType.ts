import type { StrapiImage } from "./StrapiImage";

export interface NonFormattedUserType {
  id: number;
  username: string;
  email: string;
  role?: {
    type: RoleTypes;
  };
  avatar?: any;
}

export interface UserType {
  id: number;
  username: string;
  email: string;
  role: RoleTypes;
  avatar: StrapiImage | null;
}

type RoleTypes = "user" | "admin";
