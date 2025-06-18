export interface CreateVoucherDto {
    name: string;
    description: string;
    discount: number; // Assuming discount is a percentage
    validFrom: Date;
    validTo: Date;
    code: string; // Unique code for the voucher
    isActive: boolean; // Indicates if the voucher is currently active
}