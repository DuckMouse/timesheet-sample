import { format } from 'date-fns';

import { EntryState, EntryType } from '@data';
import { calculateTotal } from '@timesheet/utilities';

import { DurationEditorComponent } from '../duration-editor/duration-editor.component';
import { EntryActionNewComponent } from '../entry-action-new/entry-action-new.component';
import { EntryActionActiveComponent } from '../entry-action-active/entry-action-active.component';

const columnDefs = [
  {
    headerName: 'State',
    field: 'state',
    editable: false,
    checkboxSelection: (params: any) => params.data.state === EntryState.active
  },
  {
    headerName: 'Date',
    field: 'date',
    cellRenderer: (params: any) => format(new Date(params.value), 'dd/MM/yyyy'),
    editable: false
  },
  { headerName: 'Title', field: 'title' },
  {
    headerName: 'Type',
    field: 'type',
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: [
        EntryType.draftingDocument,
        EntryType.research,
        EntryType.telephoneCall
      ]
    }
  },
  {
    headerName: 'Duration (hh:mm)',
    valueFormatter: (params: any) =>
      `${params.value.hours} hours, ${params.value.minutes} minutes`,
    cellEditor: 'durationEditorComponent',
    field: 'duration'
  },
  {
    headerName: 'Hourly Rate',
    field: 'hourlyRate',
    cellRenderer: (params: any) => '$' + parseInt(params.value,10).toFixed(2)
  },
  {
    headerName: 'Total',
    colId: 'total',
    valueGetter: (params: any) =>
      calculateTotal(params.data.duration, params.data.hourlyRate),
    valueFormatter: (params: any) => '$' + params.value.toFixed(2),
    editable: false
  },
  ,
  {
    headerName: 'Actions',
    field: 'actions',
    editable: false,
    flex: 2,
    minWidth: 200,
    cellRendererSelector: (params: any) => {
      switch (params.data.state) {
        case EntryState.active: {
          return { component: 'entryActionActiveComponent' };
        }
        case EntryState.new: {
          return { component: 'entryActionNewComponent' };
        }
        default:
          return '';
      }
    }
  }
];

export const gridOptions = {
  defaultColDef: {
    editable: true,
    flex: 1
  },
  frameworkComponents: {
    durationEditorComponent: DurationEditorComponent,
    entryActionNewComponent: EntryActionNewComponent,
    entryActionActiveComponent: EntryActionActiveComponent
  },
  getRowNodeId: (data: any) => data.id,
  animateRows: true,
  suppressClickEdit: true,
  deltaRowDataMode: true,
  suppressRowClickSelection: true,
  rowSelection: 'multiple',
  editType: 'fullRow',
  columnDefs
};
