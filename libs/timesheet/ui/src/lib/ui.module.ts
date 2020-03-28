import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { AgGridModule } from 'ag-grid-angular';

import { TimesheetTableComponent } from './timesheet-table/timesheet-table.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, AgGridModule.withComponents([])],
  declarations: [TimesheetTableComponent],
  exports: [TimesheetTableComponent]
})
export class UiModule {}
