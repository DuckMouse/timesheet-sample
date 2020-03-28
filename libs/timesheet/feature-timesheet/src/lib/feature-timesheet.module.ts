import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TimesheetComponent } from './timesheet/timesheet.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: TimesheetComponent }
    ])
  ],
  declarations: [TimesheetComponent]
})
export class FeatureTimesheetModule {}
