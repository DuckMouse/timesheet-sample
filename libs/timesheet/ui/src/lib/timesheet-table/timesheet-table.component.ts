import { calculateTotal, mapAction } from '@timesheet/utilities';
import { Component, OnInit, Input } from '@angular/core';

import { GridApi, RowNode } from 'ag-grid-community';
import { format } from 'date-fns';
import { uuid } from 'uuidv4';

import {
  TimesheetEntry,
  EntryType,
  EntryState,
  EntryAction
} from '@timesheet/models';
import { environment } from '@env/environment';

import { DurationEditorComponent } from '../duration-editor/duration-editor.component';
import { TimeDurationComponent } from '../time-duration/time-duration.component';
import { EntryActionComponent } from '../entry-action/entry-action.component';

@Component({
  selector: 'timesheet-timesheet-table',
  templateUrl: './timesheet-table.component.html',
  styleUrls: ['./timesheet-table.component.scss']
})
export class TimesheetTableComponent implements OnInit {
  @Input() timesheetEntries: TimesheetEntry[] = [];

  context: any;
  frameworkComponents = {
    timeDurationComponent: TimeDurationComponent,
    durationEditorComponent: DurationEditorComponent,
    entryActionComponent: EntryActionComponent
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
    {
      headerName: 'Actions',
      field: 'actions',
      editable: false,
      valueGetter: (params: any) => params.data.state,
      cellRenderer: 'entryActionComponent'
    }
  ];
  getRowNodeId = (data: any) => {
    return data.id;
  };

  private gridApi: GridApi;
  private gridColumnApi: any;

  constructor() {
    this.context = {
      componentParent: this
    };
  }

  ngOnInit(): void {}

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  executeAction(entryAction: EntryAction, node: RowNode) {
    switch (entryAction) {
      case EntryAction.save: {
        this.gridApi.updateRowData({
          update: [
            {
              ...node.data,
              state: EntryState.active
            }
          ]
        });
        this.gridApi.stopEditing();
        break;
      }
      case EntryAction.edit: {
        this.gridApi.updateRowData({
          update: [
            {
              ...node.data,
              actions: [EntryAction.save, EntryAction.cancel]
            }
          ]
        });
        this.gridApi.startEditingCell({
          rowIndex: node.rowIndex,
          colKey: 'title'
        });

        break;
      }
      case EntryAction.cancel: {
        if (node.data.state === EntryState.new) {
          this.gridApi.removeItems([node]);
        } else {
          this.gridApi.stopEditing();
        }
        break;
      }
      case EntryAction.delete: {
        this.gridApi.removeItems([node]);
        break;
      }
    }
  }

  addNewRow() {
    const newEntry = this.createNewEmptyRow();
    this.gridApi.updateRowData({ add: [newEntry], addIndex: 0 });
    this.gridApi.startEditingCell({ rowIndex: 0, colKey: 'title' });
  }

  private createNewEmptyRow(): TimesheetEntry {
    return {
      id: uuid(),
      state: EntryState.new,
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
