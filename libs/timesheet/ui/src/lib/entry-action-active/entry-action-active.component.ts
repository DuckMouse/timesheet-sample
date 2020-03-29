import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { EntryAction } from '@timesheet/models';

@Component({
  selector: 'timesheet-entry-action-active',
  templateUrl: './entry-action-active.component.html',
  styleUrls: ['./entry-action-active.component.scss']
})
export class EntryActionActiveComponent
  implements OnInit, ICellRendererAngularComp {
  params: any;
  parentContext: any;
  edittingFlag = false;
  entryActions = EntryAction;

  refresh(params: any): boolean {
    return true;
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.parentContext = params.context.componentParent;
  }
  executeAction(action: EntryAction) {
    this.edittingFlag = action === EntryAction.edit ? true : false;
    this.parentContext.executeAction(action, this.params.node);
  }

  ngOnInit(): void {}
}
