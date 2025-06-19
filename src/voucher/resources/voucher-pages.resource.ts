import { VoucherResource } from './voucher.resource';

export interface VoucherPagesResource {
  data: VoucherResource[]; 
  total: number; 
  page: number; 
  limit: number; 
  totalPages: number
}