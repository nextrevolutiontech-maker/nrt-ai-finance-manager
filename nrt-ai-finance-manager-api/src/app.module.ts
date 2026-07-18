import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { InvoicesModule } from './invoices/invoices.module';
import { QuotationsModule } from './quotations/quotations.module';
import { ExpensesModule } from './expenses/expenses.module';
import { IncomeModule } from './income/income.module';
import { PaymentsModule } from './payments/payments.module';
import { CustomersModule } from './customers/customers.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { CustomerLedgerModule } from './customer-ledger/customer-ledger.module';
import { SupplierLedgerModule } from './supplier-ledger/supplier-ledger.module';
import { CashFlowModule } from './cash-flow/cash-flow.module';
import { ProfitLossModule } from './profit-loss/profit-loss.module';
import { FinancialReportsModule } from './financial-reports/financial-reports.module';
import { TaxManagementModule } from './tax-management/tax-management.module';
import { PaymentRemindersModule } from './payment-reminders/payment-reminders.module';
import { AiFinanceAssistantModule } from './ai-finance-assistant/ai-finance-assistant.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SettingsModule } from './settings/settings.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    InvoicesModule,
    QuotationsModule,
    ExpensesModule,
    IncomeModule,
    PaymentsModule,
    CustomersModule,
    SuppliersModule,
    CustomerLedgerModule,
    SupplierLedgerModule,
    CashFlowModule,
    ProfitLossModule,
    FinancialReportsModule,
    TaxManagementModule,
    PaymentRemindersModule,
    AiFinanceAssistantModule,
    NotificationsModule,
    SettingsModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
