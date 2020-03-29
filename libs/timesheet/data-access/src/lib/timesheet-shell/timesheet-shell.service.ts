import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { TimesheetEntry, EntryState } from '@timesheet/models';
import { calculateTotal } from '@timesheet/utilities';

@Injectable({
  providedIn: 'root'
})
export class TimesheetShellService {
  private timeSheetEntriesSubject = new BehaviorSubject<TimesheetEntry[]>([]);
  timeSheetEntries$ = this.timeSheetEntriesSubject.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  fetchTimesheetEntries(): void {
    this.httpClient
      .get<TimesheetEntry[]>('/api/entries')
      .pipe(
        startWith(this.timeSheetEntriesSubject.value),
        map((entries: TimesheetEntry[]) => {
          return entries.map(entry => ({
            ...entry,
            total: calculateTotal(entry.duration, entry.hourlyRate)
          }));
        })
      )
      .subscribe(entries => this.timeSheetEntriesSubject.next(entries));
  }

  addNewEntries(entries: TimesheetEntry[]): void {
    const newEntries = entries.map(entry => ({
      ...entry,
      state: EntryState.submitted
    }));
    this.httpClient
      .post('/api/AddEntries', newEntries)
      .subscribe(() => this.fetchTimesheetEntries());
  }
}
