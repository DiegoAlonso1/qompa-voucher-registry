# Qompa Voucher Registry - NestJS + Encore

Este proyecto es una aplicación de registro de comprobantes (vouchers) construida con [NestJS](https://docs.nestjs.com/) y [Encore.dev](https://encore.dev/docs/ts).
Utiliza Prisma como ORM para la interacción con una base de datos PostgreSQL y se integra con la API de OpenAI (ChatGPT) para funcionalidades de analítica sobre los comprobantes.

## Características

*   CRUD de Vouchers (Comprobantes).
*   Simulación de envío de comprobantes a SUNAT (actualización de estado).
*   Descarga de todos los comprobantes en formato CSV.
*   Búsqueda paginada y filtrada de comprobantes (por fecha, tipo y estado).
*   Integración con ChatGPT para realizar preguntas sobre los datos de los comprobantes.

## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

*   [Node.js](https://nodejs.org/) (se recomienda la versión LTS más reciente)
*   [Encore CLI](https://encore.dev/docs/ts/install)

## Configuración y Ejecución Local

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local:

1.  **Clonar el Repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd qompa-voucher-registry
    ```

2.  **Instalar Dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raíz del proyecto. Este archivo contendrá las variables de entorno necesarias para la aplicación. Puedes copiar el archivo `.env.example` (si existe) o crearlo desde cero.

    Contenido del archivo `.env`:
    ```env
    # Tu API Key de OpenAI
    OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    ```
    *   **`DATABASE_URL`**: Asegúrate de que la base de datos especificada (`DATABASE`) exista en tu instancia de PostgreSQL.
    *   **`OPENAI_API_KEY`**: Obtén tu API key desde la plataforma de OpenAI.

    *Importante*: NestJS utiliza `ConfigModule` (configurado en `src/app.module.ts`) para cargar estas variables de entorno.

4.  **Configurar la Base de Datos (Prisma):**
    Este proyecto utiliza Prisma para interactuar con la base de datos.

    *   Aplica las migraciones para crear las tablas necesarias en tu base de datos:
        ```bash
        npx prisma migrate dev
        ```
    *   (Opcional) Genera el cliente Prisma si es necesario (usualmente `migrate dev` lo hace automáticamente):
        ```bash
        npx prisma generate
        ```
    *   (Opcional) Pobla la base de datos con datos de ejemplo (15 vouchers distribuidos en 4 empresas) ejecutando:
        ```bash
        npx prisma db seed
        ```
        Esto creará automáticamente 15 comprobantes de ejemplo en la base de datos para que puedas probar la aplicación desde el inicio.

5.  **Ejecutar la Aplicación con Encore:**
    Una vez configurado, puedes iniciar la aplicación usando Encore:
    ```bash
    encore run
    ```
    Esto iniciará la aplicación NestJS dentro del entorno de Encore. Por defecto, Encore expone los servicios y la API.

6.  **Acceder a la Aplicación:**
    *   **API Endpoints**: Los endpoints definidos en los controladores (ej. `src/voucher/vouchers.controller.ts`) estarán disponibles. Encore te mostrará las URLs base en la consola al iniciar.
    *   **Dashboard de Desarrollador de Encore**: Puedes acceder al dashboard local de Encore para ver trazas, documentación de la API generada automáticamente, y más.

## Estructura del Proyecto (Resumen)

*   `src/core/prisma`: Contiene el `schema.prisma` y las migraciones de la base de datos.
*   `src/voucher`: Módulo para la gestión de comprobantes (servicio, controlador, DTOs, recursos).
*   `src/analitics`: Módulo para la analítica de comprobantes usando ChatGPT.
*   `src/chatgpt`: Módulo de servicio para interactuar con la API de OpenAI.
*   `src/app.module.ts`: Módulo raíz de la aplicación NestJS, donde se configuran módulos globales como `ConfigModule`.
*   `src/applicationContext.ts`: Utilidad de Encore para acceder a los servicios de NestJS.

