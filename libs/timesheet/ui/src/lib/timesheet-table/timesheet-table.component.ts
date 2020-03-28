import { Component, OnInit, Input } from '@angular/core';

import { TimesheetEntry } from '@timesheet/models';

@Component({
  selector: 'timesheet-timesheet-table',
  templateUrl: './timesheet-table.component.html',
  styleUrls: ['./timesheet-table.component.scss']
})
export class TimesheetTableComponent implements OnInit {
  @Input() timesheetEntries: TimesheetEntry[];
  columnDefs = [
    { headerName: 'State', field: 'state' },
    { headerName: 'Date', field: 'date' },
    { headerName: 'Title', field: 'title' },
    { headerName: 'Type', field: 'type' },
    { headerName: 'Duration', field: 'duration' },
    { headerName: 'Hourly Rate', field: 'hourlyRate' },
    { headerName: 'Total', field: 'total' },
    { headerName: 'Actions', field: 'actions' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
