import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryActionComponent } from './entry-action.component';

describe('EntryActionComponent', () => {
  let component: EntryActionComponent;
  let fixture: ComponentFixture<EntryActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
