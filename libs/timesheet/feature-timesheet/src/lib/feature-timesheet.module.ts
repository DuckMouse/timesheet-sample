import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UiModule } from '@timesheet/ui';

import { TimesheetComponent } from './timesheet/timesheet.component';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: TimesheetComponent }
    ])
  ],
  declarations: [TimesheetComponent]
})
export class FeatureTimesheetModule {}
