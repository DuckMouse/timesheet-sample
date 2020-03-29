import { Component, OnInit } from '@angular/core';

import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

import { EntryAction } from '@timesheet/models';

@Component({
  selector: 'timesheet-entry-action-new',
  templateUrl: './entry-action-new.component.html',
  styleUrls: ['./entry-action-new.component.scss']
})
export class EntryActionNewComponent implements ICellRendererAngularComp {
  params: any;
  parentContext: any;
  entryActions = EntryAction;

  refresh(params: any): boolean {
    return true;
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.parentContext = params.context.componentParent;
  }
  executeAction(action: EntryAction) {
    this.parentContext.executeAction(action, this.params.node);
  }
}
