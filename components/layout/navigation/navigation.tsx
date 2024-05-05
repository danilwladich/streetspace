"use client";

import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useTranslations } from "next-intl";

import { NavLink } from "./nav-link";
import {
  Home,
  Map,
  User,
  Settings,
  CircleHelp,
  ShieldCheck,
} from "lucide-react";

export interface ILink {
  path: string;
  name: string;
  icon: JSX.Element;
}

export function Navigation() {
  const t = useTranslations("layout.navigation");

  const { user: authUser } = useAuthStore();

  const isAdmin = authUser?.role === "ADMIN";

  const links: ILink[] = [
    ...(isAdmin
      ? [
          {
            path: "/admin",
            name: t("admin"),
            icon: <ShieldCheck className="h-4 w-4" />,
          },
        ]
      : []),
    {
      path: "/",
      name: t("home"),
      icon: <Home className="h-4 w-4" />,
    },
    {
      path: "/questions",
      name: t("Q&A"),
      icon: <CircleHelp className="h-4 w-4" />,
    },
    {
      path: "/map",
      name: t("map"),
      icon: <Map className="h-4 w-4" />,
    },
    {
      path: authUser ? `/profile/${authUser.username}` : "/auth",
      name: authUser ? t("profile") : t("singIn"),
      icon: <User className="h-4 w-4" />,
    },
    {
      path: "/settings",
      name: t("settings"),
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <nav className="flex justify-between">
      {links.map((link, index) => (
        <NavLink
          key={link.name}
          {...link}
          isLastElement={index + 1 === links.length}
        />
      ))}
    </nav>
  );
}
