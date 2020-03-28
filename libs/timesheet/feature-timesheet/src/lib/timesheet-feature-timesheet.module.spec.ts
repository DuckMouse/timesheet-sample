import { async, TestBed } from '@angular/core/testing';
import { TimesheetFeatureTimesheetModule } from './timesheet-feature-timesheet.module';

describe('TimesheetFeatureTimesheetModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TimesheetFeatureTimesheetModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(TimesheetFeatureTimesheetModule).toBeDefined();
  });
});
