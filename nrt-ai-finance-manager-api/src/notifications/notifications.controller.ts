import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  findAll(@Query('isRead') isRead?: string) {
    const isReadBool = isRead === 'true' ? true : isRead === 'false' ? false : undefined;
    return this.notificationsService.findAll(isReadBool);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  @Post()
  create(
    @Body()
    body: {
      title: string;
      message: string;
      type: string;
    },
  ) {
    return this.notificationsService.create(body);
  }

  @Patch('mark-all-read')
  markAllAsRead() {
    return this.notificationsService.markAllAsRead();
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }
}
