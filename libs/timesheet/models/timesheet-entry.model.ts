import { Time } from '@angular/common';

import { EntryState } from './entry-state.enum';
import { EntryType } from './entry-type.enum';

export interface TimesheetEntry {
  state: EntryState;
  date: Date;
  title: string;
  type: EntryType;
  duration: Time;
  hourlyRate: number;
  total: number;
}
