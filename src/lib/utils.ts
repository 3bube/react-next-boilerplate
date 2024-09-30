import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: string[]):any {
  return twMerge(clsx(inputs));
}
