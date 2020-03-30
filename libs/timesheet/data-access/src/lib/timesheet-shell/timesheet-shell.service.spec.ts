import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TimesheetShellService } from './timesheet-shell.service';

describe('TimesheetShellService', () => {
  let service: TimesheetShellService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(TimesheetShellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
