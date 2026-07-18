import { Module } from '@nestjs/common';
import { ProfitLossController } from './profit-loss.controller';
import { ProfitLossService } from './profit-loss.service';

@Module({
  controllers: [ProfitLossController],
  providers: [ProfitLossService],
  exports: [ProfitLossService],
})
export class ProfitLossModule {}
