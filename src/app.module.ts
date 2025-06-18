import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { VouchersModule } from './voucher/vouchers.module';

@Module({
  imports: [CatsModule, VouchersModule],
})
export class AppModule {}
