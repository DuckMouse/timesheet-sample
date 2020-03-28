import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimesheetShellService {
  constructor() {}

  getHello() {
    console.log('gello');
  }
}
