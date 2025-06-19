import { Injectable, Logger } from "@nestjs/common";
import OpenAI, { APIError } from "openai";

@Injectable()
export class ChatGptService {
    private client: OpenAI;
    private readonly logger = new Logger(ChatGptService.name);

    constructor() {
        if (!process.env.OPENAI_API_KEY) {
            this.logger.error("OPENAI_API_KEY no está configurada en las variables de entorno.");
            throw new Error("OPENAI_API_KEY no está configurada en las variables de entorno.");
        }
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async ask(prompt: string): Promise<string> {
        try {
            const completion = await this.client.chat.completions.create({
                model: "gpt-3.5-turbo", // Puedes cambiar a "gpt-4", "gpt-4-turbo-preview", etc.
                messages: [
                    // Para este caso, un solo mensaje de usuario con el prompt completo debería funcionar.
                    // Podrías estructurarlo con roles system/user si necesitas más control.
                    { role: "user", content: prompt },
                ],
                // temperature: 0.7, // Opcional: Ajusta la creatividad vs determinismo
                // max_tokens: 1500, // Opcional: Limita la longitud de la respuesta
            });

            const answer = completion.choices[0]?.message?.content?.trim();

            if (answer) {
                return answer;
            } else {
                this.logger.error("No se encontró contenido de respuesta válido en la respuesta de OpenAI", completion);
                throw new Error("No se recibió una respuesta con contenido válido de OpenAI.");
            }
        } catch (error) {
            // Primero, logueamos el error crudo para tener todos los detalles si es necesario
            this.logger.error("Error crudo al comunicarse con la API de OpenAI:", error);

            if (error instanceof APIError) {
                // Errores específicos de la API de OpenAI
                const status = error.status; // Código de estado HTTP
                const message = error.message; // Mensaje de error de OpenAI
                const code = error.code;     // Código de error específico de OpenAI (ej: 'invalid_api_key')
                const type = error.type;     // Tipo de error específico de OpenAI

                this.logger.error(
                    `Error de API de OpenAI - Estado: ${status}, Código: ${code}, Tipo: ${type}, Mensaje: ${message}`,
                    error.stack 
                );
                throw new Error(`Error de API de OpenAI [${status}/${code}]: ${message}`);
            } else if (error instanceof Error) {
                // Otros errores que son instancias de Error (ej. problemas de red no capturados por APIConnectionError)
                this.logger.error(`Error genérico al comunicarse con la API de OpenAI: ${error.message}`, error.stack);
                throw new Error(`Error al procesar la solicitud a OpenAI: ${error.message}`);
            } else {
                // Errores que no son instancias de Error (raro, pero posible)
                this.logger.error(`Error desconocido (no es instancia de Error) al comunicarse con la API de OpenAI: ${String(error)}`);
                throw new Error(`Error desconocido al comunicarse con la API de OpenAI: ${String(error)}`);
            }
        }
    }
}