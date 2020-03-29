import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Time } from '@angular/common';

import { ICellEditorAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'timesheet-duration-editor',
  templateUrl: './duration-editor.component.html',
  styleUrls: ['./duration-editor.component.scss']
})
export class DurationEditorComponent implements OnInit, ICellEditorAngularComp {
  hoursFormControl: FormControl;
  minutesFormControl: FormControl;

  constructor() {}

  ngOnInit(): void {}

  agInit(params: any): void {
    this.hoursFormControl = new FormControl(params.value.hours);
    this.minutesFormControl = new FormControl(params.value.minutes);
  }

  getValue() {
    return {
      hours: parseInt(this.hoursFormControl.value),
      minutes: parseInt(this.minutesFormControl.value)
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
