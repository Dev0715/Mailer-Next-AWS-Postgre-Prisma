"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import React from "react";
import { ListItem } from "@/components/utils/list-item";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SubItem = {
  title: string;
  href: string;
  description: string;
};

type MenuItem = {
  title: string;
  href?: string;
  children?: SubItem[];
};

export const Navbar = () => {
  const path = usePathname();
  const menuItems: MenuItem[] = [
    {
      title: "Audience Dashboard",
      href: "/audience"
    },
    {
      title: "All contacts",
      href: "/audience/contacts"
    },
    {
      title: "Segments",
      href: "/audience/segments"
    },
    {
      title: "All Campaigns",
      href: "/campaign"
    },
    {
      title: "New Campaign",
      href: "/campaign/create-campaign"
    }
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-x-2">
        {menuItems.map((menuItem) =>
          menuItem.children ? (
            <NavigationMenuItem key={menuItem.href}>
              <NavigationMenuTrigger>{menuItem.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {menuItem.children.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={menuItem.href}>
              <Link href={menuItem.href || ""} legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={path === menuItem.href}
                >
                  {menuItem.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
