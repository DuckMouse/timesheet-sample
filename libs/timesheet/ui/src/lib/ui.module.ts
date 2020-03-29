import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { AgGridModule } from 'ag-grid-angular';

import { TimesheetTableComponent } from './timesheet-table/timesheet-table.component';
import { TimeDurationComponent } from './time-duration/time-duration.component';
import { DurationEditorComponent } from './duration-editor/duration-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EntryActionComponent } from './entry-action/entry-action.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([
      DurationEditorComponent,
      TimeDurationComponent,
      EntryActionComponent
    ])
  ],
  declarations: [
    TimesheetTableComponent,
    TimeDurationComponent,
    DurationEditorComponent,
    EntryActionComponent
  ],
  exports: [TimesheetTableComponent, TimeDurationComponent]
})
export class UiModule {}
