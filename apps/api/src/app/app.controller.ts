import { Controller, Get, Post, Body } from '@nestjs/common';

import { TimesheetEntry } from '@data';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('entries')
  getEntries() {
    return this.appService.getEntries();
  }
  @Post('addentries')
  addEntries(@Body() entries: TimesheetEntry[]) {
    return this.appService.addEntries(entries);
  }
}
