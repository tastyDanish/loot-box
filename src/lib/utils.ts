import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomItem<T>(items: T[]): { item: T; index: number } {
  const index = Math.floor(Math.random() * items.length);
  return { item: items[index], index };
}
