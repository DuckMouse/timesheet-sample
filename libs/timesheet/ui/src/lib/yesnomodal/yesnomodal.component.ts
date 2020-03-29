import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TimesheetEntry } from '@timesheet/models';

@Component({
  selector: 'timesheet-yesnomodal',
  templateUrl: './yesnomodal.component.html',
  styleUrls: ['./yesnomodal.component.scss']
})
export class YesnomodalComponent {
  constructor(
    public dialogRef: MatDialogRef<YesnomodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TimesheetEntry
  ) {}

  onNoClick() {
    this.dialogRef.close();
  }
}
