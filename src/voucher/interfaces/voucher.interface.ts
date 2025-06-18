export interface Voucher {
    id: number; // Unique identifier for the voucher
    name: string; // Name of the voucher
    description: string; // Description of the voucher
    discount: number; // Discount amount or percentage
    validFrom: Date; // Start date of voucher validity
    validTo: Date; // End date of voucher validity
    code: string; // Unique code for the voucher
    isActive: boolean; // Indicates if the voucher is currently active
}