import { Controller, Get, Post, Body } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('entries')
  getEntries() {
    return this.appService.getEntries();
  }
  @Post('AddEntries')
  addEntries(@Body() entries: any[]) {
    console.log(entries);
    return this.appService.addEntries(entries);
  }
}
