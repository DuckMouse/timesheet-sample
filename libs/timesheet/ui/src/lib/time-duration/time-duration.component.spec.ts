import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeDurationComponent } from './time-duration.component';

describe('TimeDurationComponent', () => {
  let component: TimeDurationComponent;
  let fixture: ComponentFixture<TimeDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeDurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
