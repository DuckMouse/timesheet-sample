import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationEditorComponent } from './duration-editor.component';

describe('DurationEditorComponent', () => {
  let component: DurationEditorComponent;
  let fixture: ComponentFixture<DurationEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
