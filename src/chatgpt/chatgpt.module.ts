import { Module } from "@nestjs/common";
import { ChatGptService } from "./chatgpt.service";

@Module({
    providers: [ChatGptService],
    exports: [ChatGptService],
})
export class ChatGptModule {}