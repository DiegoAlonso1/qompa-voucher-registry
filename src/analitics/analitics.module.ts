import { Module } from "@nestjs/common";
import { AnaliticsService } from "./analitics.service";
import { ChatGptModule } from "../chatgpt/chatgpt.module";
import { VouchersModule } from "../voucher/vouchers.module";

@Module({
  imports: [ChatGptModule, VouchersModule],
  providers: [AnaliticsService],
})
export class AnaliticsModule {}