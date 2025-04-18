import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Facility } from "../types/facility";
import { format } from 'date-fns';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const updateFacilityStatus = (facility: Facility) => {
  const now = new Date();
  const currentTime = format(now, 'HH:mm');

  const openTime = facility.openingTime;
  const closeTime = facility.closingTime;

  const isCurrentlyOpen = isTimeInRange(currentTime, openTime, closeTime);

  return {
    ...facility,
    isOpen: isCurrentlyOpen
  };
}

export const isTimeInRange = (currentTime: string, openTime: string, closeTime: string): boolean => {
  const [currentHour, currentMinute] = currentTime.split(':').map(Number);
  const [openHour, openMinute] = openTime.split(':').map(Number);
  const [closeHour, closeMinute] = closeTime.split(':').map(Number);

  const current = currentHour * 60 + currentMinute;
  const open = openHour * 60 + openMinute;
  const close = closeHour * 60 + closeMinute;

  if (open <= close) {
    return current >= open && current <= close;
  } else {
    return current >= open || current <= close;
  }
}

export const isFacilityOpen = (openingTime: string, closingTime: string): boolean => {
  const now = new Date();
  const currentTime = format(now, 'HH:mm');
  return isTimeInRange(currentTime, openingTime, closingTime);
};

export const sortFacilityByDefaultOption = (facilities: Facility[]) => {
  return [...facilities].sort((a, b) => {
    if (a.isDefaultFacility) return -1;
    if (b.isDefaultFacility) return 1;
    return 0;
  })
}