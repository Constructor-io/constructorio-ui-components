import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function getPreferredColorScheme() {
  let colorScheme = 'light';

  // Guard clause for SSR environments
  if (typeof window === 'undefined') return colorScheme;

  // Check if the dark-mode Media-Query matches
  if (window.matchMedia('(prefers-color-scheme: dark)')?.matches) {
    colorScheme = 'dark';
  }

  return colorScheme;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isHexColor(value?: string): boolean {
  return (
    typeof value === 'string' &&
    value.length === 7 &&
    value[0] === '#' &&
    !Number.isNaN(Number(`0x${value.substring(1)}`))
  );
}
