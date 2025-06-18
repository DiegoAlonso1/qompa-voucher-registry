import { PrismaClient } from "@prisma/client";

export const vouchersProviders = [
  {
    provide: 'VOUCHER_MODEL',
    useFactory: (orm: PrismaClient) => () => orm.voucher,
    inject: ['DATABASE_CONNECTION'],
  },
];