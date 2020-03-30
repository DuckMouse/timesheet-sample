import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

import { YesnomodalComponent } from './yesnomodal.component';

describe('YesnomodalComponent', () => {
  let component: YesnomodalComponent;
  let fixture: ComponentFixture<YesnomodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule],
      declarations: [YesnomodalComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: { title: 'Test Title' } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesnomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the title of the object passed in', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Test Title');
  });
});
