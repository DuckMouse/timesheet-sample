import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';

import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'timesheet-time-duration',
  templateUrl: './time-duration.component.html',
  styleUrls: ['./time-duration.component.scss']
})
export class TimeDurationComponent implements OnInit, ICellRendererAngularComp {
  durationValue: Time;

  constructor() {}
  agInit(params: ICellRendererParams): void {
    this.durationValue = params.value;
  }
  refresh(params: any): boolean {
    this.durationValue = params.value;
    return true;
  }

  ngOnInit(): void {}
}
