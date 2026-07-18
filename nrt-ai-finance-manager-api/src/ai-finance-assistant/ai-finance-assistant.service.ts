import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AiFinanceAssistantService {
  constructor(private readonly prisma: PrismaService) {}

  async getChatHistory() {
    return this.prisma.aiChat.findMany({
      orderBy: { timestamp: 'desc' },
    });
  }

  async askAssistant(prompt: string) {
    let responseText = '';
    const lowerPrompt = prompt.toLowerCase();
    
    // Advanced Mock AI Responses
    if (lowerPrompt.includes("saving") || lowerPrompt.includes("tips")) {
      responseText = "Here are 3 tips to save money:\n1. Track your daily expenses.\n2. Create a monthly budget and stick to it.\n3. Cut down on unnecessary subscriptions.";
    } else if (lowerPrompt.includes("cash flow") || lowerPrompt.includes("profit")) {
      responseText = "You can view your detailed cash flow and profit & loss statements in the Analytics section of the dashboard.";
    } else if (lowerPrompt.includes("invoice") || lowerPrompt.includes("bill")) {
      responseText = "Need to manage invoices? Head over to the Finance -> Invoices section to create or track them.";
    } else if (lowerPrompt.includes("hello") || lowerPrompt.includes("hi")) {
      responseText = "Hello! I am your AI Finance Assistant. How can I help you manage your finances today?";
    } else {
      responseText = "That's an interesting question about your finances. I am currently operating in basic offline mode. For deep insights, you can connect my actual API key later!";
    }

    const count = await this.prisma.aiChat.count();
    const nextNum = String(count + 1).padStart(3, '0');
    const id = `CHAT-${nextNum}`;

    return this.prisma.aiChat.create({
      data: {
        id,
        prompt,
        response: responseText,
      }
    });
  }

  async clearHistory() {
    return this.prisma.aiChat.deleteMany();
  }
}
