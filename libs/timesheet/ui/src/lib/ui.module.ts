import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule} from '@angular/material/select';


import { AgGridModule } from 'ag-grid-angular';

import { TimesheetTableComponent } from './timesheet-table/timesheet-table.component';
import { TimeDurationComponent } from './time-duration/time-duration.component';
import { DurationEditorComponent } from './duration-editor/duration-editor.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([
      DurationEditorComponent,
      TimeDurationComponent
    ])
  ],
  declarations: [
    TimesheetTableComponent,
    TimeDurationComponent,
    DurationEditorComponent
  ],
  exports: [TimesheetTableComponent, TimeDurationComponent]
})
export class UiModule {}
