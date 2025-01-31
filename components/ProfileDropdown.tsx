"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "firebase/auth";
import { menuItems } from "@/constants";

const ProfileDropdown = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
          <Image
            src={user.photoURL || "/assets/images/default-profile.png"}
            alt="Profile Picture"
            width={24}
            height={24}
            className="rounded-full cursor-pointer w-full h-full"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="p-4">
          {user.displayName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((item) => (
          <DropdownMenuItem key={item.id} className="p-4">
            <Link
              href={item.url ?? "#"}
              className="flex items-center gap-2"
              onClick={item.onClick ? item.onClick : undefined}
            >
              <item.icon />
              <span>{item.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
