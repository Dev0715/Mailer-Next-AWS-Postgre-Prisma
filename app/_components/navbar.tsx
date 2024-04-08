"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";

type MenuItem = {
  title: string;
  href: string;
};

export const Navbar = () => {
  const menuItems: MenuItem[] = [
    {
      title: "Features",
      href: "/",
    },
    {
      title: "Pricing",
      href: "/",
    },
    {
      title: "Resources",
      href: "/",
    },
    {
      title: "Campaign",
      href: "/",
    },
    {
      title: "Customers",
      href: "/",
    },
  ];
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-x-2">
        {menuItems.map((menuItem, index) => (
          <NavigationMenuItem key={menuItem.title}>
            <NavigationMenuTrigger>{menuItem.title}</NavigationMenuTrigger>
            <NavigationMenuContent></NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
