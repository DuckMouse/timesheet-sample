import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'timesheet-duration-editor',
  templateUrl: './duration-editor.component.html',
  styleUrls: ['./duration-editor.component.scss']
})
export class DurationEditorComponent implements ICellEditorAngularComp {
  hoursFormControl: FormControl;
  minutesFormControl: FormControl;

  agInit(params: any): void {
    this.hoursFormControl = new FormControl(params.value.hours);
    this.minutesFormControl = new FormControl(params.value.minutes);
  }

  getValue() {
    return {
      hours: parseInt(this.hoursFormControl.value, 10),
      minutes: parseInt(this.minutesFormControl.value, 10)
    };
  }

  onKeyPress(event: any) {
    if (!isNumeric(event)) {
      event.preventDefault();
    }
    function isNumeric(ev: any) {
      return /\d/.test(ev.key);
    }
  }
}
