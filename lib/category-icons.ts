import { Tv, AirVent, WashingMachine, Refrigerator, Radio, Wrench, type LucideIcon } from "lucide-react";

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  tv: Tv,
  "ar-condicionado": AirVent,
  "lava-e-seca": WashingMachine,
  refrigerador: Refrigerator,
  "radio-e-som": Radio,
  ferramentas: Wrench,
};

export function categoryIcon(cat: string): LucideIcon {
  return CATEGORY_ICONS[cat] ?? Wrench;
}
