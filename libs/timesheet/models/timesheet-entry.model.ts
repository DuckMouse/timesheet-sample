import { Time } from '@angular/common';

import { EntryState } from './entry-state.enum';
import { EntryType } from './entry-type.enum';
import { EntryAction } from './entry-action.enum';

export interface TimesheetEntry {
  state: EntryState;
  date: string;
  title: string;
  type: EntryType;
  duration: Time;
  hourlyRate: number;
  total: number;
  actions?: EntryAction[];
}
