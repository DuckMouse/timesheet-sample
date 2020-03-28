import { async, TestBed } from '@angular/core/testing';
import { FeatureTimesheetModule } from './feature-timesheet.module';

describe('TimesheetFeatureTimesheetModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FeatureTimesheetModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FeatureTimesheetModule).toBeDefined();
  });
});
