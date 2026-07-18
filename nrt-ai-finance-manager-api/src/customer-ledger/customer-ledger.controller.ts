import { Controller, Get, Post, Patch, Delete, Param, Body, Query, Put } from '@nestjs/common';
import { CustomerLedgerService } from './customer-ledger.service';

@Controller('customer-ledger')
export class CustomerLedgerController {
  constructor(private readonly ledgerService: CustomerLedgerService) {}

  @Get()
  findAll(@Query('customerId') customerId?: string) {
    return this.ledgerService.findAll(customerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ledgerService.findOne(id);
  }

  @Post()
  create(
    @Body()
    body: {
      customerId: string;
      date: string;
      description: string;
      type: string;
      debit: number;
      credit: number;
      balance: number;
    },
  ) {
    return this.ledgerService.create(body);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.ledgerService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ledgerService.remove(id);
  }
}
