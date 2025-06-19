import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VouchersModule } from './voucher/vouchers.module';
import { AnaliticsModule } from './analitics/analitics.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), VouchersModule, AnaliticsModule],
})
export class AppModule {}
