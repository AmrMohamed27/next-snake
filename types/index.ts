import { LucideIcon } from "lucide-react";

export interface MenuItem {
  id: number;
  label: string;
  icon: LucideIcon;
  url?: string;
  onClick?: () => void;
}

export interface SnakeState {
  x: number;
  y: number;
}

export type Directions = "up" | "down" | "left" | "right" | "none";

export interface ScoreDocument {
  name: string;
  score: number;
  timestamp: Date;
}
