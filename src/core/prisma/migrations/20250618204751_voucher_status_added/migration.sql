-- CreateEnum
CREATE TYPE "VoucherStatus" AS ENUM ('PENDING', 'VALIDATED', 'REJECTED', 'OBSERVED');

-- AlterTable
ALTER TABLE "Voucher" ADD COLUMN     "status" "VoucherStatus" NOT NULL DEFAULT 'PENDING';
