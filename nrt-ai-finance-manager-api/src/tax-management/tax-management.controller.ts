import { Controller, Get, Post, Put, Patch, Delete, Param, Body } from '@nestjs/common';
import { TaxManagementService } from './tax-management.service';

@Controller('tax-management')
export class TaxManagementController {
  constructor(private readonly taxService: TaxManagementService) {}

  @Get()
  findAll() {
    return this.taxService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxService.findOne(id);
  }

  @Post()
  create(
    @Body()
    body: {
      name: string;
      rate: number;
      description: string;
    },
  ) {
    return this.taxService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.taxService.update(id, body);
  }

  @Patch(':id/status')
  toggleStatus(@Param('id') id: string, @Body('isActive') isActive: boolean) {
    return this.taxService.toggleStatus(id, isActive);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxService.remove(id);
  }
}
