import { api } from "encore.dev/api";
import applicationContext from "../applicationContext";
import { CreateVoucherDto } from "./dto/create-voucher.dto";
import { Voucher } from "./interfaces/voucher.interface";

export const findAllVouchers = api(
  { expose: true, method: 'GET', path: '/vouchers' },
  async (): Promise<{ vouchers: Voucher[] }> => {
    const { vouchersService } = await applicationContext;
    return { vouchers: await vouchersService.findAll() };
  },
);

export const getVoucherById = api(
  { expose: true, method: 'GET', path: '/vouchers/:id' },
  async ({ id }: { id: number }): Promise<{ voucher: Voucher }> => {
    const { vouchersService } = await applicationContext;
    return { voucher: await vouchersService.get(id) };
  },
);

export const createVoucher = api(
  { expose: true, method: 'POST', path: '/vouchers' },
  async (dto: CreateVoucherDto): Promise<void> => {
    const { vouchersService } = await applicationContext;
    vouchersService.create(dto);
  },
);
