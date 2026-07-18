import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { AiFinanceAssistantService } from './ai-finance-assistant.service';

@Controller('ai-assistant')
export class AiFinanceAssistantController {
  constructor(private readonly aiService: AiFinanceAssistantService) {}

  @Get('history')
  getChatHistory() {
    return this.aiService.getChatHistory();
  }

  @Post('ask')
  askAssistant(@Body('prompt') prompt: string) {
    return this.aiService.askAssistant(prompt);
  }

  @Delete('history')
  clearHistory() {
    return this.aiService.clearHistory();
  }
}
