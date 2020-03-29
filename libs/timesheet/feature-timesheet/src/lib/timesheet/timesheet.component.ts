import { Component, OnInit } from '@angular/core';

import { TimesheetShellService } from '@timesheet/data-access';
import { TimesheetEntry } from '@timesheet/models';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'timesheet-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  timeSheetEntries$ = this.timeSheetShellService.timeSheetEntries$.pipe(
    filter(entries => !!entries)
  );

  constructor(private readonly timeSheetShellService: TimesheetShellService) {}

  ngOnInit(): void {
    this.timeSheetShellService.fetchTimesheetEntries();
  }

  submitSelectedActiveEntries(timesheetEntries: TimesheetEntry[]) {
    this.timeSheetShellService.addNewEntries(timesheetEntries).subscribe();
  }
}
