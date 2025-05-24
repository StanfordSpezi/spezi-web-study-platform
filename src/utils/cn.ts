import { cn as _cn } from "@stanfordspezi/spezi-web-design-system";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for combining class names with conditional logic.
 * Builds upon the `cn` function from the Spezi Design System.
 * This function also merges Tailwind CSS classes without style conflicts.
 */
export const cn = (...inputs: Parameters<typeof _cn>) => {
  return twMerge(_cn(...inputs));
};
