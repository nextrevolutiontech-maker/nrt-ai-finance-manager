import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.invoicesService.findAll(status, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(id);
  }

  @Post()
  create(
    @Body()
    body: {
      customer: string;
      amount: number;
      date: string;
      due: string;
      status?: string;
    },
  ) {
    return this.invoicesService.create(body);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.invoicesService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoicesService.remove(id);
  }
}
