import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInWeeks,
  parseISO,
  isToday,
  format,
} from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRelativeTimeLabel(dateString: string): string {
  const now = new Date();
  const date = parseISO(dateString);

  const seconds = differenceInSeconds(now, date);
  if (seconds < 60) return `${seconds}s`;

  const minutes = differenceInMinutes(now, date);
  if (minutes < 60) return `${minutes}m`;

  const hours = differenceInHours(now, date);
  if (hours < 24) return `${hours}h`;

  const weeks = differenceInWeeks(now, date);
  return `${weeks}w`;
}

export const formatMessageTime = (dateString: string): string => {
  const date = parseISO(dateString);

  if (isToday(date)) {
    return format(date, "p");
  }

  return format(date, "d MMM");
};
