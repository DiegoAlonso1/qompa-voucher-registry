import { Module } from '@nestjs/common';
import { VouchersModule } from './voucher/vouchers.module';

@Module({
  imports: [VouchersModule],
})
export class AppModule {}
