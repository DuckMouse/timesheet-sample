import { Injectable } from '@nestjs/common';

import { TimesheetEntry, EntryState, EntryType } from '@data';

@Injectable()
export class AppService {
  timesheetEntries: TimesheetEntry[] = [
    {
      id: 'e991c6ff-44a5-4eea-b57e-818c3bde3530',
      state: EntryState.submitted,
      date: new Date('2020-03-23T00:00:00.000Z'),
      title: 'Task 1',
      type: EntryType.telephoneCall,
      duration: {
        hours: 1,
        minutes: 25
      },
      hourlyRate: 100
    },
    {
      id: '6b880076-c9ee-4898-a66a-654b57c25d23',
      state: EntryState.submitted,
      date:  new Date('2020-03-24T00:00:00.000Z'),
      title: 'Task 2',
      type: EntryType.research,
      duration: {
        hours: 3,
        minutes: 25
      },
      hourlyRate: 100.15
    },
    {
      id: '0d2aecc7-4fc0-47e6-908a-d1c57849177d',
      state: EntryState.submitted,
      date:  new Date('2020-03-24T00:00:00.000Z'),
      title: 'Task 3',
      type: EntryType.telephoneCall,
      duration: {
        hours: 2,
        minutes: 37
      },
      hourlyRate: 95.15
    },
    {
      id: '8943f5f0-83fb-44ff-8be9-e34583f76e74',
      state: EntryState.submitted,
      date:  new Date('2020-03-25T00:00:00.000Z'),
      title: 'Task 4',
      type: EntryType.draftingDocument,
      duration: {
        hours: 2,
        minutes: 51
      },
      hourlyRate: 95.15
    }
  ];

  getEntries() {
    return this.timesheetEntries;
  }
  addEntries(entries: TimesheetEntry[]) {
    this.timesheetEntries.push(...entries);
  }
}
