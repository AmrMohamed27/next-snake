import { handleSignOut } from "@/actions/auth";
import { MenuItem } from "@/types";
import { User, Trophy, LogOut } from "lucide-react";

export const CANVAS_WIDTH = 400;
export const CANVAS_HEIGHT = 400;

export const websiteTitle = "next_snake";

export const loginText = "sign_in_with_google";

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

export const startButtonText = "start";
export const pauseButtonText = "pause";
export const resumeButtonText = "resume";
export const resetButtonText = "reset";
export const restartButtonText = "restart";
export const scoreText = "score";
export const canvasFallbackText = "This is the area where the game is played.";
