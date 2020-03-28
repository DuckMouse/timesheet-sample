import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'timesheet',
    loadChildren: () =>
      import('@timesheet/feature-timesheet').then(m => m.FeatureTimesheetModule)
  },
  {
    path: '',
    redirectTo: 'timesheet',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
