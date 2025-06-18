import { Voucher } from "@prisma/client";

export interface VoucherResource {
    id: number;
    company_id: string;
    supplier_ruc: string;
    invoice_number: string;
    amount: number;
    issue_date: Date;
    document_type: string;
    igv: number;
    total: number;
    status: string;
}


export function mapVoucherToResource(voucher: Voucher): VoucherResource {
  const baseAmount = voucher.amount;
  
  const igv = parseFloat((baseAmount * 0.18).toFixed(2));
  const total = parseFloat((baseAmount + igv).toFixed(2));

  return {
    id: voucher.id,
    company_id: voucher.company_id,
    supplier_ruc: voucher.supplier_ruc,
    invoice_number: voucher.invoice_number,
    amount: baseAmount,
    issue_date: voucher.issue_date,
    document_type: voucher.document_type,
    igv,
    total,
    status: voucher.status,
  };
}