import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';
import { format } from 'date-fns';

@Component({
  selector: 'timesheet-entry-date',
  templateUrl: './entry-date.component.html',
  styleUrls: ['./entry-date.component.scss']
})
export class EntryDateComponent implements OnInit, ICellEditorAngularComp {
  constructor() {}
  dateFormControl: FormControl;

  agInit(params: ICellEditorParams): void {
    this.dateFormControl = new FormControl(new Date());
  }
  getValue() {
    return format(new Date(this.dateFormControl.value), 'dd/MM/yyyy');
  }

  ngOnInit(): void {}
}
