import { PrismaClient, VoucherStatus } from '@prisma/client';

const prisma = new PrismaClient();

const companyIds = ['COMP-A-001', 'COMP-B-002', 'COMP-C-003', 'COMP-D-004'];
const supplierRucs = ['20100066603', '20504890617', '20545375105', '20600000001', '20123456789', '20987654321'];
const documentTypes = ['Factura', 'Boleta', 'Nota de Credito', 'Recibo por Honorarios'];
const allStatuses = Object.values(VoucherStatus);

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
  console.log(`Start seeding ...`);

  const voucherDataToCreate = [];
  const startDate = new Date(2023, 0, 1); // 1 de Enero, 2023
  const endDate = new Date(); // Fecha actual

  for (let i = 1; i <= 15; i++) {
    const randomAmount = parseFloat((Math.random() * 1000 + 50).toFixed(2)); // Montos entre 50 y 1050

    voucherDataToCreate.push({
      company_id: getRandomElement(companyIds),
      supplier_ruc: getRandomElement(supplierRucs),
      invoice_number: `F${String(i).padStart(3, '0')}-${String(Math.floor(Math.random() * 8999) + 1000).padStart(4, '0')}`, // Ej: F001-1234
      amount: randomAmount,
      issue_date: getRandomDate(startDate, endDate),
      document_type: getRandomElement(documentTypes),
      status: getRandomElement(allStatuses), // Prisma usará PENDING por defecto si no se especifica y hay un @default
    });
  }

  // Eliminar vouchers existentes para evitar duplicados si se ejecuta el seed varias veces
  // ¡Cuidado! Esto borrará todos los vouchers. Comenta si no es el comportamiento deseado.
  await prisma.voucher.deleteMany({});
  console.log('Deleted existing vouchers.');

  const creationResult = await prisma.voucher.createMany({
    data: voucherDataToCreate,
    skipDuplicates: true, // En caso de que no borres y haya conflictos de unique constraints (si los tuvieras)
  });

  console.log(`Created ${creationResult.count} vouchers.`);
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
