"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import React from "react";
import { ListItem } from "@/components/utils/list-item";

type MenuItem = {
  title: string;
  href: string;
  children?: { title: string; href: string; description: string }[];
};

export const Navbar = () => {
  const audienceItems: { title: string; href: string; description: string }[] =
    [
      {
        title: "Audience Dashboard",
        href: "/audience",
        description:
          "Your audience dashboard is the home for all your contacts and audiences"
      },
      {
        title: "All contacts",
        href: "/audience/contacts",
        description: "All your contacts stored in your customer database"
      },
      {
        title: "Tags",
        href: "/audience/tags",
        description: "Group and manage your audience in tags"
      },
      {
        title: "Segments",
        href: "/audience/segments",
        description: "Classify and manage your audience in segments"
      }
    ];

  const campaignItems: { title: string; href: string; description: string }[] =
    [
      {
        title: "All Campaigns",
        href: "/campaign",
        description: "All your campaigns stored in your campaign database"
      },
      {
        title: "New Campaign",
        href: "/campaign/create-campaign",
        description: "Create a new email campaign"
      }
    ];

  const menuItems: MenuItem[] = [
    {
      title: "Features",
      href: "/"
    },
    {
      title: "Pricing",
      href: "/"
    },
    {
      title: "Resources",
      href: "/"
    },
    {
      title: "Campaign",
      href: "/campaign",
      children: campaignItems
    },
    {
      title: "Audience",
      href: "/audience",
      children: audienceItems
    }
  ];

  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-x-2">
        {menuItems.map((menuItem, index) => (
          <NavigationMenuItem key={menuItem.title}>
            <NavigationMenuTrigger>
              {/* <Link href={menuItem.href} passHref> */}
              {menuItem.title}
              {/* </Link> */}
            </NavigationMenuTrigger>
            {menuItem.children && (
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
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
