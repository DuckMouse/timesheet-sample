import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TimesheetEntry } from '@timesheet/models';
import { calculateTotal } from '@timesheet/utilities';

@Injectable({
  providedIn: 'root'
})
export class TimesheetShellService {
  constructor(private readonly httpClient: HttpClient) {}

  fetchTimesheetEntries(): Observable<TimesheetEntry[]> {
    return this.httpClient
      .get<TimesheetEntry[]>('./assets/fake-data/fake-timesheet-entries.json')
      .pipe(
        map((entries: TimesheetEntry[]) => {
          return entries.map(entry => ({
            ...entry,
            total: calculateTotal(entry.duration, entry.hourlyRate)
          }));
        })
      );
  }
}
