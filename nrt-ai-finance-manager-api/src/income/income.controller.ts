import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { IncomeService } from './income.service';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.incomeService.findAll(status, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.incomeService.findOne(id);
  }

  @Post()
  create(
    @Body()
    body: {
      source: string;
      amount: number;
      date: string;
      description: string;
      status?: string;
    },
  ) {
    return this.incomeService.create(body);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.incomeService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.incomeService.remove(id);
  }
}
