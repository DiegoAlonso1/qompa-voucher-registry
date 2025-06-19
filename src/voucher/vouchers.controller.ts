import { api } from "encore.dev/api";
import applicationContext from "../applicationContext";
import { VoucherResource } from "./resources/voucher.resource";
import { SaveVoucherResource } from "./resources/save-voucher.resource";
import type { IncomingMessage, ServerResponse } from "http"; // Import Node.js http types
import { FindVoucherPagesWithFiltersResource } from "./resources/find-voucher-pages-with-filters.resource";
import { VoucherPagesResource } from "./resources/voucher-pages.resource";

// export const findAllVouchers = api(
//   { expose: true, method: 'GET', path: '/vouchers' },
//   async (): Promise<{ vouchers: VoucherResource[] }> => {
//     const { vouchersService } = await applicationContext;
//     return { vouchers: await vouchersService.findAll() };
//   },
// );

export const getVoucherById = api(
  { expose: true, method: 'GET', path: '/vouchers/:id' },
  async ({ id }: { id: number }): Promise<{ voucher: VoucherResource }> => {
    const { vouchersService } = await applicationContext;
    return { voucher: await vouchersService.get(id) };
  },
);

export const createVoucher = api(
  { expose: true, method: 'POST', path: '/vouchers' },
  async (dto: SaveVoucherResource): Promise<{ voucher: VoucherResource }> => {
    const { vouchersService } = await applicationContext;
    return { voucher: await vouchersService.create(dto) };
  },
);

export const sendVoucherToSunat = api(
  { expose: true, method: 'POST', path: '/vouchers/:id/send' },
  async ({ id }: { id: number }): Promise<{ voucher: VoucherResource }> => {
    const { vouchersService } = await applicationContext;
    return { voucher: await vouchersService.sendToSunat(id) };
  },
);

export const downloadAllVouchersAsCsv = api.raw(
  { expose: true, method: 'GET', path: '/vouchers/download' },
  async (req: IncomingMessage, resp: ServerResponse): Promise<void> => {
    const { vouchersService } = await applicationContext;
    const csvData = await vouchersService.downloadAllAsCsv();

    resp.writeHead(200, {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="vouchers.csv"',
    });
    resp.end(csvData);
  },
);

export const findAllVouchers = api(
  { expose: true, method: 'GET', path: '/vouchers' },
  async (query: FindVoucherPagesWithFiltersResource): Promise<{ voucherPages: VoucherPagesResource }> => {
    const { vouchersService } = await applicationContext;
    return { voucherPages: await vouchersService.findAllWithFilters(query) };
  },
);