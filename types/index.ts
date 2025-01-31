import { LucideIcon } from "lucide-react";

export interface MenuItem {
  id: number;
  label: string;
  icon: LucideIcon;
  url?: string;
  onClick?: () => void;
}
