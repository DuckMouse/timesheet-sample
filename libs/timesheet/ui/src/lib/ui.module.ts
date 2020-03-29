import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { AgGridModule } from 'ag-grid-angular';

import { TimesheetTableComponent } from './timesheet-table/timesheet-table.component';
import { TimeDurationComponent } from './time-duration/time-duration.component';
import { DurationEditorComponent } from './duration-editor/duration-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EntryActionActiveComponent } from './entry-action-active/entry-action-active.component';
import { EntryActionNewComponent } from './entry-action-new/entry-action-new.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
    AgGridModule.withComponents([
      DurationEditorComponent,
      TimeDurationComponent,
      EntryActionActiveComponent,
      EntryActionNewComponent
    ])
  ],
  declarations: [
    TimesheetTableComponent,
    TimeDurationComponent,
    DurationEditorComponent,
    EntryActionActiveComponent,
    EntryActionNewComponent
  ],
  exports: [TimesheetTableComponent, TimeDurationComponent]
})
export class UiModule {}
