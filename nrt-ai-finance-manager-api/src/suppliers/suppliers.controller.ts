import { Controller, Get, Post, Patch, Delete, Param, Body, Query, Put } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.suppliersService.findAll(status, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suppliersService.findOne(id);
  }

  @Post()
  create(
    @Body()
    body: {
      name: string;
      email: string;
      phone: string;
      address: string;
      company: string;
      status?: string;
    },
  ) {
    return this.suppliersService.create(body);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.suppliersService.updateStatus(id, status);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.suppliersService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suppliersService.remove(id);
  }
}
