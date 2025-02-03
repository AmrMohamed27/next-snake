import { handleSignOut } from "@/actions/auth";
import { MenuItem } from "@/types";
import { Trophy, LogOut } from "lucide-react";

export const DESKTOP_CANVAS_WIDTH = 400;
export const DESKTOP_CANVAS_HEIGHT = 400;
export const MOBILE_CANVAS_WIDTH = 260;
export const MOBILE_CANVAS_HEIGHT = 260;

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
export const gameOverText = "game_over";
export const scoreText = "score";
export const canvasFallbackText = "This is the area where the game is played.";

export const highscoresHeader = "high_scores";
export const leaderboardsCaption = "top_10_high_scores";

export const homeHeader = "welcome_to_snake_game";
export const homeSubheader = "click_start_or_press_an_arrow_key_to_play!";

export const difficulties = ["insane", "very_hard", "hard", "medium", "easy"];
export const difficultiesTitle = "difficulty";

export const gameStartSrc = "media/game_start.mp3";
export const gameOverSrc = "media/game_over.mp3";
export const eatingSrc = "media/eating.mp3";

export const muteText = "mute_sound_effects";

export const notFoundText = "error_404 - page_not_found";
export const notFoundLinkText = "go_back_to_homepage";
