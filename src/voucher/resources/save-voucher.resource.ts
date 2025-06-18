export interface SaveVoucherResource {
    company_id: string;
    supplier_ruc: string;
    invoice_number: string;
    amount: number;
    issue_date: Date;
    document_type: string;
}