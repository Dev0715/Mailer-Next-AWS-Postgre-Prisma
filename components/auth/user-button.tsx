"use client";

import Link from "next/link";
import { FaUser } from "react-icons/fa";
import {
  BackpackIcon,
  ExitIcon,
  MixerHorizontalIcon,
  PersonIcon
} from "@radix-ui/react-icons";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { LoginButton } from "./login-button";
import { WrappedButton } from "../utils/wrapped-button";
import { SignupButton } from "./signup-button";

export const UserButton = () => {
  const user = useCurrentUser();

  if (!user)
    return (
      <div className="flex items-center gap-x-2">
        <LoginButton>
          {/* <WrappedButton variant="default" size="lg"> */}
          <p className="text-md font-medium">Log in</p>
          {/* </WrappedButton> */}
        </LoginButton>
        <p className="text-gray-400">|</p>
        <SignupButton>
          <p className="text-md font-medium">Sign up</p>
        </SignupButton>
      </div>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="rounded-xl">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <Link href="/user">
          <DropdownMenuItem>
            <MixerHorizontalIcon className="h-4 w-4 mr-3" />
            <span>User Settings</span>
          </DropdownMenuItem>
        </Link>
        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-4 w-4 mr-3" />
            <span>Logout</span>
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
