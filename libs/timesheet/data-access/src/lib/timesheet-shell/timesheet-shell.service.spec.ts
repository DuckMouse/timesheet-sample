import { TestBed } from '@angular/core/testing';

import { TimesheetShellService } from './timesheet-shell.service';

describe('TimesheetShellService', () => {
  let service: TimesheetShellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimesheetShellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
