import { api } from "encore.dev/api";
import applicationContext from "../applicationContext";
import { AnswerResource } from "./resources/answer.resource";
import { SendQuestionResource } from "./resources/send-question.resource";

export const askForVouchers = api(
  { expose: true, method: 'POST', path: '/analitics' },
  async (dto: SendQuestionResource): Promise<{ answer: AnswerResource }> => {
    const { analiticsService } = await applicationContext;
    return { answer: await analiticsService.askForVouchers(dto) };
  },
);