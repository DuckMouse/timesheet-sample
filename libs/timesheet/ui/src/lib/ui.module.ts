import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AgGridModule } from 'ag-grid-angular';

import { TimesheetTableComponent } from './timesheet-table/timesheet-table.component';
import { TimeDurationComponent } from './time-duration/time-duration.component';
import { DurationEditorComponent } from './duration-editor/duration-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EntryActionActiveComponent } from './entry-action-active/entry-action-active.component';
import { EntryActionNewComponent } from './entry-action-new/entry-action-new.component';
import { EntryDateComponent } from './entry-date/entry-date.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([
      DurationEditorComponent,
      TimeDurationComponent,
      EntryActionActiveComponent,
      EntryActionNewComponent,
      EntryDateComponent
    ])
  ],
  declarations: [
    TimesheetTableComponent,
    TimeDurationComponent,
    DurationEditorComponent,
    EntryActionActiveComponent,
    EntryActionNewComponent,
    EntryDateComponent
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-AU' }],
  exports: [TimesheetTableComponent, TimeDurationComponent]
})
export class UiModule {}
