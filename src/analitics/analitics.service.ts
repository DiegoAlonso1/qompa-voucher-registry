import { Injectable, Logger } from "@nestjs/common";
import { SendQuestionResource } from "./resources/send-question.resource";
import { AnswerResource } from "./resources/answer.resource";
import applicationContext from "../applicationContext";

@Injectable()
export class AnaliticsService {
    private readonly logger = new Logger(AnaliticsService.name);

    async askForVouchers(sendQuestionResource: SendQuestionResource): Promise<AnswerResource> {
        const { vouchersService, chatGptService } = await applicationContext;
        const vouchers = await vouchersService.findAll();

        if (vouchers.length === 0) {
            return {
                answer: 'No se encontraron comprobantes en la base de datos.',
            };
        }

        // Considera los límites de tokens con OpenAI. Si hay muchos vouchers, esto podría ser un problema.
        const vouchersDataString = JSON.stringify(vouchers, null, 2); // JSON embellecido

        const userQuestion = sendQuestionResource.prompt;

        // Construir el prompt para ChatGPT
        const promptForChatGpt = `
            Contexto: A continuación se presenta una lista de comprobantes (vouchers) en formato JSON:
            ${vouchersDataString}

            Pregunta: Basándose únicamente en la información de los comprobantes proporcionados arriba, responda a la siguiente pregunta:
            "${userQuestion}"

            Si la pregunta no puede ser respondida con la información de los comprobantes, por favor indíquelo.
        `;

        try {
            const chatGptAnswer = await chatGptService.ask(promptForChatGpt);
            return {
                answer: chatGptAnswer,
            };
        } catch (error) {
            this.logger.error(`Error al contactar ChatGptService`);
            return {
                answer: 'Hubo un error al procesar su pregunta con el servicio de IA. Por favor, inténtelo de nuevo más tarde.',
            };
        }
    }
}
