import { Controller, Get, Post, Patch, Delete, Param, Body, Query, Put } from '@nestjs/common';
import { SupplierLedgerService } from './supplier-ledger.service';

@Controller('supplier-ledger')
export class SupplierLedgerController {
  constructor(private readonly ledgerService: SupplierLedgerService) {}

  @Get()
  findAll(@Query('supplierId') supplierId?: string) {
    return this.ledgerService.findAll(supplierId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ledgerService.findOne(id);
  }

  @Post()
  create(
    @Body()
    body: {
      supplierId: string;
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
