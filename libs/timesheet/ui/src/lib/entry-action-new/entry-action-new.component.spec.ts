import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryActionNewComponent } from './entry-action-new.component';

describe('EntryActionNewComponent', () => {
  let component: EntryActionNewComponent;
  let fixture: ComponentFixture<EntryActionNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryActionNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryActionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
