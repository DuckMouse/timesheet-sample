import { Component, OnInit } from '@angular/core';

import { TimesheetShellService } from '@timesheet/data-access';
import { TimesheetEntry } from '@timesheet/models';

@Component({
  selector: 'timesheet-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  tempDataVar : TimesheetEntry[];

  constructor(private readonly timeSheetShellService: TimesheetShellService) {}

  ngOnInit(): void {
    this.timeSheetShellService
      .fetchTimesheetEntries()
      .subscribe(result => this.tempDataVar = result);
  }
}
