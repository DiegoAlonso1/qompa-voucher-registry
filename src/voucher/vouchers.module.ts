import { Module } from "@nestjs/common";
import { DatabaseModule } from "../core/database.module";
import { VouchersService } from "./vouchers.service";
import { vouchersProviders } from "./vouchers.providers";

@Module({
  imports: [DatabaseModule],
  providers: [VouchersService, ...vouchersProviders],
})
export class VouchersModule {}
