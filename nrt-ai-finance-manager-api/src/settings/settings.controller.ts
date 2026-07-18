import { Controller, Get, Param, Body, Put } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  findAll() {
    return this.settingsService.findAll();
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.settingsService.findOne(key);
  }

  @Put(':key')
  upsert(@Param('key') key: string, @Body('value') value: string) {
    return this.settingsService.upsert(key, value);
  }

  @Put()
  upsertMultiple(@Body() settings: Record<string, string>) {
    return this.settingsService.upsertMultiple(settings);
  }
}
