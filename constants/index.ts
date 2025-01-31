import { handleSignOut } from "@/actions/auth";
import { MenuItem } from "@/types";
import { User, Trophy, LogOut } from "lucide-react";

export const menuItems: MenuItem[] = [
  {
    id: 1,
    label: "Profile",
    icon: User,
    url: "/profile",
  },
  {
    id: 2,
    label: "Leaderboards",
    icon: Trophy,
    url: "/leaderboards",
  },
  {
    id: 3,
    label: "Logout",
    icon: LogOut,
    onClick: handleSignOut,
  },
];
