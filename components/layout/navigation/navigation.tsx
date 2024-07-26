"use client";

import { useAuthStore } from "@/hooks/store/use-auth-store";
import { useTranslations } from "next-intl";

import { NavLink } from "./nav-link";
import { Map, User, LogIn, Settings, ShieldCheck } from "lucide-react";

export interface ILink {
  path: string;
  name: string;
  icon: JSX.Element;
}

export function Navigation() {
  const t = useTranslations("layout.navigation");

  const { user: authUser } = useAuthStore();

  const isAdmin = authUser?.role === "ADMIN";

  const iconClassName = "md:h-4 h-5 md:w-4 w-5";
  const links: ILink[] = [
    {
      path: "/",
      name: t("map"),
      icon: <Map className={iconClassName} />,
    },
    // {
    //   path: "/questions",
    //   name: t("Q&A"),
    //   icon: <CircleHelp className={iconClassName} />,
    // },
    {
      path: authUser ? `/profile/${authUser.username}` : "/auth",
      name: authUser ? t("profile") : t("singIn"),
      icon: authUser ? (
        <User className={iconClassName} />
      ) : (
        <LogIn className={iconClassName} />
      ),
    },
    {
      path: "/settings",
      name: t("settings"),
      icon: <Settings className={iconClassName} />,
    },
  ];

  if (isAdmin) {
    links.push({
      path: "/admin",
      name: t("admin"),
      icon: <ShieldCheck className={iconClassName} />,
    });
  }

  return (
    <nav className="flex items-center">
      {links.map((l) => (
        <NavLink key={l.name} {...l} />
      ))}
    </nav>
  );
}
