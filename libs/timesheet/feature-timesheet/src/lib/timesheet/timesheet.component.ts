import { Component, OnInit } from '@angular/core';

import { TimesheetShellService } from '@timesheet/data-access';

@Component({
  selector: 'timesheet-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {
  constructor(private readonly timeSheetShellService: TimesheetShellService) {}

  ngOnInit(): void {
    this.timeSheetShellService
      .fetchTimesheetEntries()
      .subscribe(result => console.log(result));
  }
}
