import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { TimesheetEntry, EntryState } from '@timesheet/models';
import { calculateTotal } from '@timesheet/utilities';

@Injectable({
  providedIn: 'root'
})
export class TimesheetShellService {
  private timeSheetEntriesSubject = new BehaviorSubject<TimesheetEntry[]>(null);
  timeSheetEntries$ = this.timeSheetEntriesSubject.asObservable();

  constructor(private readonly httpClient: HttpClient) {}

  fetchTimesheetEntries(): void {
    this.httpClient
      .get<TimesheetEntry[]>('./assets/fake-data/fake-timesheet-entries.json')
      .pipe(
        map((entries: TimesheetEntry[]) => {
          return entries.map(entry => ({
            ...entry,
            total: calculateTotal(entry.duration, entry.hourlyRate)
          }));
        })
      )
      .subscribe(entries => this.timeSheetEntriesSubject.next(entries));
  }

  addNewEntries(entries: TimesheetEntry[]): Observable<boolean> {
    const newEntries = entries.map(entry => ({
      ...entry,
      state: EntryState.submitted
    }));
    this.timeSheetEntriesSubject.next([
      ...this.timeSheetEntriesSubject.value,
      ...newEntries
    ]);
    return of(true);
  }
}
