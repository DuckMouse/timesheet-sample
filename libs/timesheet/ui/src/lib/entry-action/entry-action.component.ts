import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { EntryAction } from '@timesheet/models';
import { mapAction } from '@timesheet/utilities';

@Component({
  selector: 'timesheet-entry-action',
  templateUrl: './entry-action.component.html',
  styleUrls: ['./entry-action.component.scss']
})
export class EntryActionComponent implements OnInit, ICellRendererAngularComp {
  params: any;
  parentContext: any;
  actions: EntryAction[] = [];

  constructor() {}

  refresh(params: any): boolean {
    this.params = this.params;
    this.actions = [];
    this.actions.push(...mapAction(params.data.state));
    return true;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.parentContext = params.context.componentParent;
    this.actions.push(...mapAction(params.data.state));
  }

  ngOnInit(): void {}

  executeAction(action: EntryAction) {
    this.parentContext.executeAction(action, this.params.node);
  }
}
