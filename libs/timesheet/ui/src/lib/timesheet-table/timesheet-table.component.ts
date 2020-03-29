import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { GridApi, RowNode } from 'ag-grid-community';
import { uuid } from 'uuidv4';

import { TimesheetEntry, EntryType, EntryState, EntryAction } from '@data';
import { calculateTotal } from '@timesheet/utilities';
import { environment } from '@env/environment';

import { YesnomodalComponent } from '../yesnomodal/yesnomodal.component';
import { gridOptions } from './grid-options';

@Component({
  selector: 'timesheet-timesheet-table',
  templateUrl: './timesheet-table.component.html',
  styleUrls: ['./timesheet-table.component.scss']
})
export class TimesheetTableComponent {
  @Input() timesheetEntries: TimesheetEntry[] = [];
  @Output() submitSelectedActiveEntries = new EventEmitter<TimesheetEntry[]>();

  context: any;
  gridOptions = gridOptions;
  defaultHourlyRate = environment.defaultHourlyRate;

  private gridApi: GridApi;

  constructor(private dialog: MatDialog) {
    this.context = {
      componentParent: this
    };
  }

  onGridReady(params: any): void {
    this.gridApi = params.api;
  }

  executeAction(entryAction: EntryAction, node: RowNode): void {
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
        this.openDialog(node)
          .afterClosed()
          .subscribe(result => {
            if (result) {
              this.gridApi.updateRowData({
                remove: [{ ...node.data }]
              });
            }
          });
        break;
      }
    }
  }

  addNewRow(): void {
    this.gridApi.updateRowData({
      add: [this.createNewEmptyRow()],
      addIndex: 0
    });
    this.gridApi.startEditingCell({ rowIndex: 0, colKey: 'title' });
  }

  submitActiveEntries(): void {
    const activeEntries = this.gridApi.getSelectedRows();
    if (activeEntries.length > 0) {
      this.submitSelectedActiveEntries.emit(activeEntries);
    }
  }

  private openDialog(node: RowNode): MatDialogRef<YesnomodalComponent, string> {
    return this.dialog.open(YesnomodalComponent, {
      width: '250px',
      data: node.data
    });
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
