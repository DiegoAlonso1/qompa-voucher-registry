/*
  Warnings:

  - You are about to drop the column `code` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `validFrom` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the column `validTo` on the `Voucher` table. All the data in the column will be lost.
  - You are about to drop the `Cat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `company_id` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document_type` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoice_number` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issue_date` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier_ruc` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Voucher" DROP COLUMN "code",
DROP COLUMN "description",
DROP COLUMN "discount",
DROP COLUMN "isActive",
DROP COLUMN "name",
DROP COLUMN "validFrom",
DROP COLUMN "validTo",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "company_id" TEXT NOT NULL,
ADD COLUMN     "document_type" TEXT NOT NULL,
ADD COLUMN     "invoice_number" TEXT NOT NULL,
ADD COLUMN     "issue_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "supplier_ruc" TEXT NOT NULL;

-- DropTable
DROP TABLE "Cat";

-- DropTable
DROP TABLE "User";
