import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { QuotationsService } from './quotations.service';

@Controller('quotations')
export class QuotationsController {
  constructor(private readonly quotationsService: QuotationsService) {}

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.quotationsService.findAll(status, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quotationsService.findOne(id);
  }

  @Post()
  create(
    @Body()
    body: {
      customer: string;
      amount: number;
      date: string;
      validUntil: string;
      status?: string;
    },
  ) {
    return this.quotationsService.create(body);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.quotationsService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quotationsService.remove(id);
  }
}
