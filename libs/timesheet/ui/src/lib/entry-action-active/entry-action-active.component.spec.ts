import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryActionActiveComponent } from './entry-action-active.component';

describe('EntryActionActiveComponent', () => {
  let component: EntryActionActiveComponent;
  let fixture: ComponentFixture<EntryActionActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryActionActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryActionActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
