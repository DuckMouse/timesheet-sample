import { Component, OnInit, Input } from '@angular/core';

import { GridApi, Module } from 'ag-grid-community';

import { TimesheetEntry, EntryType, EntryState } from '@timesheet/models';

import { DurationEditorComponent } from './../duration-editor/duration-editor.component';
import { TimeDurationComponent } from './../time-duration/time-duration.component';

@Component({
  selector: 'timesheet-timesheet-table',
  templateUrl: './timesheet-table.component.html',
  styleUrls: ['./timesheet-table.component.scss']
})
export class TimesheetTableComponent implements OnInit {
  @Input() timesheetEntries: TimesheetEntry[] = [];
  frameworkComponents = {
    timeDurationComponent: TimeDurationComponent,
    durationEditorComponent: DurationEditorComponent
  };

  defaultColDef = {
    editable: true
  };

  columnDefs = [
    { headerName: 'State', field: 'state' },
    {
      headerName: 'Date',
      field: 'date'
    },
    { headerName: 'Title', field: 'title' },
    {
      headerName: 'Type',
      field: 'type'
    },
    {
      cellRenderer: 'timeDurationComponent',
      editable: true,
      cellEditor: 'durationEditorComponent',
      cellEditorParams: { value: { hours: 1, minutes: 0 } },
      field: 'duration'
    },
    { headerName: 'Hourly Rate', field: 'hourlyRate' },
    { headerName: 'Total', field: 'total' },
    ,
    { headerName: 'Actions', field: 'actions' }
  ];

  private gridApi: GridApi;
  private gridColumnApi: any;

  constructor() {}

  ngOnInit(): void {}

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  addNewRow() {
    // const newEntry = this.createNewEmptyRow();
    this.gridApi.updateRowData({ add: [{}], addIndex: 0 });
  }
}
