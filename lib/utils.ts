import { SnakeState } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toSnakeCase = (str: string | null): string => {
  if (!str) return "";
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/[^a-z0-9_]/g, "") // Remove non-alphanumeric characters except underscores
    .replace(/_+/g, "_"); // Ensure single underscores only
};

export const generateRandomSquare = (
  width: number,
  height: number
): SnakeState => {
  const x = Math.floor(Math.random() * width);
  const y = Math.floor(Math.random() * height);
  // Round down to the nearest multiple of 20
  const result: SnakeState = { x: x - (x % 20), y: y - (y % 20) };
  return result;
};

export function detectSelfCollision(snake: SnakeState[]): boolean {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  return false;
}

export function formatDate(date: Date): string {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}
