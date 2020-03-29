import { Time } from '@angular/common';

export function calculateTotal(duration: Time, hourlyRate: number) {
  const ratePerMinute = hourlyRate / 60;
  const combinedTotalDurationInMinutes = duration.hours * 60 + Math.ceil(duration.minutes / 15) * 15;
  return combinedTotalDurationInMinutes * ratePerMinute;
}
