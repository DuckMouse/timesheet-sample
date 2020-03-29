import { Time } from '@angular/common';

export function calculateTotal(duration: Time, hourlyRate: number) {
  const roundedMinutes = Math.ceil(duration.minutes / 15) * 15;
  const roundedDuration =
    roundedMinutes === 60
      ? { hours: duration.hours + 1, minutes: 0 }
      : { hours: duration.hours, minutes: roundedMinutes };
  const ratePerMinute = hourlyRate / 60;
  const durationInMinutes = roundedDuration.hours * 60 + roundedMinutes;

  return durationInMinutes * ratePerMinute;
}
