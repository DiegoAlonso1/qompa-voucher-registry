import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VouchersModule } from './voucher/vouchers.module';
import { VouchersService } from './voucher/vouchers.service';
import { AnaliticsModule } from './analitics/analitics.module';
import { AnaliticsService } from './analitics/analitics.service';
import { ChatGptService } from './chatgpt/chatgpt.service';
import { ChatGptModule } from './chatgpt/chatgpt.module';

// Mounting the application as bare Nest standalone application so that we can use
// the Nest services inside our Encore endpoints
const applicationContext: Promise<{ vouchersService: VouchersService, analiticsService: AnaliticsService, chatGptService: ChatGptService }> =
  NestFactory.createApplicationContext(AppModule).then((app) => {
    return {
      vouchersService: app.select(VouchersModule).get(VouchersService, { strict: true }),
      analiticsService: app.select(AnaliticsModule).get(AnaliticsService, { strict: true }),
      chatGptService: app.select(ChatGptModule).get(ChatGptService, { strict: true }),
    };
  });

export default applicationContext;
