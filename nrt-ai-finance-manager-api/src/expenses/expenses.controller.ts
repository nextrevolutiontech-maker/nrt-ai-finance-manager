import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.expensesService.findAll(status, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }

  @Post()
  create(
    @Body()
    body: {
      category: string;
      amount: number;
      date: string;
      vendor: string;
      description: string;
      status?: string;
    },
  ) {
    return this.expensesService.create(body);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.expensesService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(id);
  }
}
