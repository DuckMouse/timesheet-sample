import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetComponent } from './timesheet.component';
import { TimesheetShellService } from '@timesheet/data-access';

describe('TimesheetComponent', () => {
  let component: TimesheetComponent;
  let fixture: ComponentFixture<TimesheetComponent>;

  beforeEach(async(() => {
    const timeSheetShellService = jasmine.createSpyObj(
      'TimesheetShellService',
      ['fetchTimesheetEntries']
    );

    TestBed.configureTestingModule({
      declarations: [TimesheetComponent],
      providers: [
        { provide: TimesheetShellService, useValue: timeSheetShellService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
