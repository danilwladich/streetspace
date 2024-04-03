"use client";

import { useAuthStore } from "@/hooks/use-auth-store";
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
  const { user: authUser } = useAuthStore();

  const isAdmin = authUser?.role === "admin";

  const links: ILink[] = [
    ...(isAdmin
      ? [
          {
            path: "/admin",
            name: "Admin",
            icon: <ShieldCheck className="h-4 w-4" />,
          },
        ]
      : []),
    {
      path: "/",
      name: "Home",
      icon: <Home className="h-4 w-4" />,
    },
    {
      path: "/questions",
      name: "Q&A",
      icon: <CircleHelp className="h-4 w-4" />,
    },
    {
      path: "/map",
      name: "Map",
      icon: <Map className="h-4 w-4" />,
    },
    {
      path: authUser ? `/profile/${authUser.username}` : "/auth",
      name: authUser ? "Profile" : "Sing in",
      icon: <User className="h-4 w-4" />,
    },
    {
      path: "/settings",
      name: "Settings",
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
