import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { VouchersModule } from './voucher/vouchers.module';
import { VouchersService } from './voucher/vouchers.service';

// Mounting the application as bare Nest standalone application so that we can use
// the Nest services inside our Encore endpoints
const applicationContext: Promise<{ catsService: CatsService, vouchersService: VouchersService }> =
  NestFactory.createApplicationContext(AppModule).then((app) => {
    return {
      catsService: app.select(CatsModule).get(CatsService, { strict: true }),
      vouchersService: app.select(VouchersModule).get(VouchersService, { strict: true }),
    };
  });

export default applicationContext;
