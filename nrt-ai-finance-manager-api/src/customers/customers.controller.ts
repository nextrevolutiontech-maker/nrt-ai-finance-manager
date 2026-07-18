import { Controller, Get, Post, Patch, Delete, Param, Body, Query, Put } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll(
    @Query('status') status?: string,
    @Query('search') search?: string,
  ) {
    return this.customersService.findAll(status, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
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
    return this.customersService.create(body);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.customersService.updateStatus(id, status);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.customersService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
