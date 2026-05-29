import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCategory(id: string) {
  return id.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

export function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}
