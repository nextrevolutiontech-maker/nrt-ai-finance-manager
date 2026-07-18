import { Module } from '@nestjs/common';
import { AiFinanceAssistantController } from './ai-finance-assistant.controller';
import { AiFinanceAssistantService } from './ai-finance-assistant.service';

@Module({
  controllers: [AiFinanceAssistantController],
  providers: [AiFinanceAssistantService],
  exports: [AiFinanceAssistantService],
})
export class AiFinanceAssistantModule {}
