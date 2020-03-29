import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';


import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'timesheet-time-duration',
  templateUrl: './time-duration.component.html',
  styleUrls: ['./time-duration.component.scss']
})
export class TimeDurationComponent implements OnInit {
  durationValue: Time;

  constructor() {}

  agInit(params: ICellRendererParams): void {
    this.durationValue = params.value;
  }

  ngOnInit(): void {}
}
