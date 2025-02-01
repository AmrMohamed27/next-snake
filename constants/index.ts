import { handleSignOut } from "@/actions/auth";
import { MenuItem } from "@/types";
import { Trophy, LogOut } from "lucide-react";

export const CANVAS_WIDTH = 400;
export const CANVAS_HEIGHT = 400;

export const websiteTitle = "next_snake";

export const loginText = "sign_in_with_google";

export const menuItems: MenuItem[] = [
  {
    id: 1,
    label: "Leaderboards",
    icon: Trophy,
    url: "/leaderboards",
  },
  {
    id: 2,
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

export const highscoresHeader = "high_scores";
export const leaderboardsCaption = "top_10_high_scores";

export const homeHeader = "welcome_to_snake_game";
export const homeSubheader =
  "click_start_or_press_an_arrow_key_to_play_and_climb_the_leaderboards!";
