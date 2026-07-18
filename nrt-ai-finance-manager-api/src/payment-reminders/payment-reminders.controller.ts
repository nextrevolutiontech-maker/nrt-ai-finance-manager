import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { PaymentRemindersService } from './payment-reminders.service';

@Controller('payment-reminders')
export class PaymentRemindersController {
  constructor(private readonly reminderService: PaymentRemindersService) {}

  @Get()
  findAll(@Query('status') status?: string) {
    return this.reminderService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reminderService.findOne(id);
  }

  @Post()
  create(
    @Body()
    body: {
      invoiceId: string;
      customerId: string;
      date: string;
      message: string;
      status?: string;
    },
  ) {
    return this.reminderService.create(body);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.reminderService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reminderService.remove(id);
  }
}
