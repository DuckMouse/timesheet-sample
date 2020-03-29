import { Component, OnInit } from '@angular/core';

import { filter } from 'rxjs/operators';

import { TimesheetShellService } from '@timesheet/data-access';
import { TimesheetEntry } from '@timesheet/models';

@Component({
  selector: 'timesheet-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  timeSheetEntries$ = this.timeSheetShellService.timeSheetEntries$;

  constructor(private readonly timeSheetShellService: TimesheetShellService) {}

  ngOnInit(): void {
    this.timeSheetShellService.fetchTimesheetEntries();
  }

  submitSelectedActiveEntries(timesheetEntries: TimesheetEntry[]): void {
    this.timeSheetShellService.addNewEntries(timesheetEntries);
  }
}
