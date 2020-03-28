import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { TimesheetEntry } from '@timesheet/models';

@Injectable({
  providedIn: 'root'
})
export class TimesheetShellService {
  constructor(private readonly httpClient: HttpClient) {}

  fetchTimesheetEntries(): Observable<TimesheetEntry[]> {
    return this.httpClient.get<TimesheetEntry[]>(
      './assets/fake-data/fake-timesheet-entries.json'
    );
  }
}
