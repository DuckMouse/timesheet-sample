import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { GridApi, RowNode } from 'ag-grid-community';
import { format } from 'date-fns';
import { uuid } from 'uuidv4';

import {
  TimesheetEntry,
  EntryType,
  EntryState,
  EntryAction
} from '@timesheet/models';
import { calculateTotal } from '@timesheet/utilities';
import { environment } from '@env/environment';

import { DurationEditorComponent } from '../duration-editor/duration-editor.component';
import { TimeDurationComponent } from '../time-duration/time-duration.component';
import { EntryActionActiveComponent } from './../entry-action-active/entry-action-active.component';
import { EntryActionNewComponent } from './../entry-action-new/entry-action-new.component';

@Component({
  selector: 'timesheet-timesheet-table',
  templateUrl: './timesheet-table.component.html',
  styleUrls: ['./timesheet-table.component.scss']
})
export class TimesheetTableComponent implements OnInit, OnChanges {
  @Input() timesheetEntries: TimesheetEntry[] = [];
  @Output() submitSelectedActiveEntries = new EventEmitter<TimesheetEntry[]>();

  private gridApi: GridApi;
  context: any;
  frameworkComponents = {
    timeDurationComponent: TimeDurationComponent,
    durationEditorComponent: DurationEditorComponent,
    entryActionNewComponent: EntryActionNewComponent,
    entryActionActiveComponent: EntryActionActiveComponent
  };

  defaultColDef = {
    editable: true
  };

  columnDefs = [
    {
      headerName: 'State',
      field: 'state',
      editable: false,
      checkboxSelection: (params: any) =>
        params.data.state === EntryState.active ? true : false
    },
    {
      headerName: 'Date',
      field: 'date',
      cellRenderer: (params: any) =>
        format(new Date(params.value), 'dd/LL/yyyy'),
      editable: false
    },
    { headerName: 'Title', field: 'title' },
    {
      headerName: 'Type',
      field: 'type',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: [
          EntryType.draftingDocument,
          EntryType.research,
          EntryType.telephoneCall
        ]
      }
    },
    {
      headerName: 'Duration (hh:mm)',
      cellRenderer: 'timeDurationComponent',
      cellEditor: 'durationEditorComponent',
      field: 'duration'
    },
    {
      headerName: 'Hourly Rate',
      field: 'hourlyRate'
    },
    {
      headerName: 'Total',
      colId: 'total',
      valueGetter: (params: any) =>
        calculateTotal(params.data.duration, params.data.hourlyRate),
      valueFormatter: (params: any) => '$ ' + params.value.toFixed(2),
      editable: false
    },
    ,
    {
      headerName: 'Actions',
      field: 'actions',
      editable: false,
      cellRendererSelector: (params: any) => {
        switch (params.data.state) {
          case EntryState.active: {
            return { component: 'entryActionActiveComponent' };
          }
          case EntryState.new: {
            return { component: 'entryActionNewComponent' };
          }
          default:
            return null;
        }
      }
    }
  ];
  getRowNodeId = (data: any) => {
    return data.id;
  };

  constructor() {
    this.context = {
      componentParent: this
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.gridApi) {
      this.gridApi.refreshCells();
    }
  }

  ngOnInit(): void {}

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  executeAction(entryAction: EntryAction, node: RowNode) {
    switch (entryAction) {
      case EntryAction.save: {
        this.gridApi.updateRowData({
          update: [{ ...node.data, state: EntryState.active }]
        });
        this.gridApi.stopEditing();
        this.gridApi.redrawRows({ rowNodes: [node] });
        break;
      }
      case EntryAction.edit: {
        this.gridApi.startEditingCell({
          rowIndex: node.rowIndex,
          colKey: 'title'
        });
        break;
      }
      case EntryAction.cancel: {
        switch (node.data.state) {
          case EntryState.active: {
            this.gridApi.undoCellEditing();
            this.gridApi.stopEditing();
            break;
          }
          default: {
            this.gridApi.updateRowData({
              remove: [{ ...node.data }]
            });
            break;
          }
        }
        break;
      }
      case EntryAction.delete: {
        this.gridApi.updateRowData({
          remove: [{ ...node.data }]
        });
        break;
      }
    }
  }

  addNewRow() {
    const newEntry = this.createNewEmptyRow();
    this.gridApi.updateRowData({ add: [newEntry], addIndex: 0 });
    this.gridApi.startEditingCell({ rowIndex: 0, colKey: 'title' });
  }

  submitActiveEntries() {
    const activeEntries = this.gridApi.getSelectedRows();
    if (activeEntries.length > 0) {
      this.submitSelectedActiveEntries.emit(activeEntries);
    }
  }

  private createNewEmptyRow(): TimesheetEntry {
    return {
      id: uuid(),
      state: EntryState.new,
      date: new Date(),
      title: 'Task Title',
      type: EntryType.draftingDocument,
      duration: environment.defaultDuration,
      hourlyRate: environment.defaultHourlyRate,
      total: calculateTotal(
        environment.defaultDuration,
        environment.defaultHourlyRate
      )
    };
  }
}
