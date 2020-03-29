import { calculateTotal } from '@timesheet/utilities';
import { Component, OnInit, Input } from '@angular/core';

import { GridApi } from 'ag-grid-community';
import { format } from 'date-fns';

import { TimesheetEntry, EntryType, EntryState } from '@timesheet/models';
import { environment } from '@env/environment';

import { DurationEditorComponent } from './../duration-editor/duration-editor.component';
import { TimeDurationComponent } from './../time-duration/time-duration.component';
import { Time } from '@angular/common';

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
    { headerName: 'State', field: 'state', editable: false },
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
      headerName: 'Duration (hh:mm)',
      cellRenderer: 'timeDurationComponent',
      cellEditor: 'durationEditorComponent',
      field: 'duration'
    },
    { headerName: 'Hourly Rate', field: 'hourlyRate' },
    {
      headerName: 'Total',
      colId: 'total',
      valueGetter: (params: any) =>
        calculateTotal(params.data.duration, params.data.hourlyRate),
      editable: false
    },
    ,
    { headerName: 'Actions', field: 'actions', editable: false }
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
    const newEntry = this.createNewEmptyRow();
    this.gridApi.updateRowData({ add: [newEntry], addIndex: 0 });
  }

  private createNewEmptyRow(): TimesheetEntry {
    return {
      state: EntryState.active,
      date: format(new Date(), 'dd/MM/yyyy'),
      title: 'Task Title',
      type: EntryType.draftingDocument,
      duration: environment.defaultDuration,
      hourlyRate: environment.defulatHourlyRate,
      total: calculateTotal(
        environment.defaultDuration,
        environment.defulatHourlyRate
      )
    };
  }
}
