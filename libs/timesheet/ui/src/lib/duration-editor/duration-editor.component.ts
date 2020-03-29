import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Time } from '@angular/common';

@Component({
  selector: 'timesheet-duration-editor',
  templateUrl: './duration-editor.component.html',
  styleUrls: ['./duration-editor.component.scss']
})
export class DurationEditorComponent implements OnInit, AfterViewInit {
  params: any;
  durationValue: Time;
  @ViewChild('i') textInput: any;

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.textInput.nativeElement.focus();
    });
  }
  ngOnInit(): void {}

  agInit(params: any): void {
    this.params = params;
    this.durationValue = params.value;
  }

  getValue() {
    return this.textInput.nativeElement.value;
  }

  onKeyPress(event: any) {
    if (!isNumeric(event)) {
      event.preventDefault();
    }

    function isNumeric(ev: any) {
      return /\d/.test(ev.key);
    }
  }

  onKeyDown(event: any) {
    if (event.keyCode === 39 || event.keyCode === 37) {
      event.stopPropagation();
    }
  }
}
