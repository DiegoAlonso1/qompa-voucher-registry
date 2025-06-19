import { Prisma, PrismaClient, VoucherStatus } from "@prisma/client";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { SaveVoucherResource } from "./resources/save-voucher.resource";
import { VoucherResource, mapVoucherToResource } from "./resources/voucher.resource";
import { FindVoucherPagesWithFiltersResource } from "./resources/find-voucher-pages-with-filters.resource";
import { VoucherPagesResource } from "./resources/voucher-pages.resource";

@Injectable()
export class VouchersService {
  constructor(
    @Inject('VOUCHER_MODEL') private readonly db: () => PrismaClient['voucher'],
  ) { }

  async create(createVoucherDto: SaveVoucherResource): Promise<VoucherResource> {
    const voucher = await this.db().create({
      data: createVoucherDto
    });

    return mapVoucherToResource(voucher);
  }

  async get(id: number): Promise<VoucherResource> {
    const voucher = await this.db().findUnique({
      where: { id },
    });
    if (!voucher) {
      throw new NotFoundException(`Voucher with ID ${id} not found`);
    }

    return mapVoucherToResource(voucher);
  }

  async findAll(): Promise<VoucherResource[]> {
    const vouchers = await this.db().findMany();
    return vouchers.map(voucher => mapVoucherToResource(voucher));
  }

  async sendToSunat(id: number): Promise<VoucherResource> {
    const voucher = await this.db().findUnique({
      where: { id },
    });
    if (!voucher) {
      throw new NotFoundException(`Voucher with ID ${id} not found`);
    }

    // Simulate sending to SUNAT by updating the status
    const allStatuses = Object.values(VoucherStatus);

    // Get random status excluding PENDING
    const eligibleStatuses = allStatuses.filter(status => status !== VoucherStatus.PENDING);
    const randomIndex = Math.floor(Math.random() * eligibleStatuses.length);
    const randomStatus = eligibleStatuses[randomIndex];

    const updatedVoucher = await this.db().update({
      where: { id },
      data: { status: randomStatus },
    });
    return mapVoucherToResource(updatedVoucher);
  }

  async downloadAllAsCsv(): Promise<string> {
    const vouchers = await this.findAll();
    if (vouchers.length === 0) {
      return '';
    }

    const header = 'ID,Company ID,Supplier RUC,Invoice Number,Amount,Issue Date,Document Type,IGV,Total,Status\n';
    const rows = vouchers.map(voucher =>
      `${voucher.id},${voucher.company_id},${voucher.supplier_ruc},${voucher.invoice_number},${voucher.amount},${voucher.issue_date.toISOString()},${voucher.document_type},${voucher.igv},${voucher.total},${voucher.status}`
    ).join('\n');

    return header + rows;
  }

  async findAllWithFilters(
    query: FindVoucherPagesWithFiltersResource,
  ): Promise<VoucherPagesResource> {
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 10;
    const skip = (page - 1) * limit;

    const where: Prisma.VoucherWhereInput = {};

    if (query.issue_date) {
      const date = new Date(query.issue_date);
      
      if (!isNaN(date.getTime())) {
        const startDate = new Date(date);
        startDate.setUTCHours(0, 0, 0, 0);

        const endDate = new Date(date);
        endDate.setUTCHours(23, 59, 59, 999);

        where.issue_date = {
          gte: startDate,
          lte: endDate,
        };
      }
    }

    if (query.document_type) {
      where.document_type = {
        contains: query.document_type,
        mode: 'insensitive', // Búsqueda case-insensitive
      };
    }

    if (query.status) {
      if (Object.values(VoucherStatus).includes(query.status as VoucherStatus)) {
        where.status = query.status as VoucherStatus;
      }
    }

    const vouchers = await this.db().findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        id: 'desc', // Opcional: orden por defecto
      },
    });

    const total = await this.db().count({ where });
    const totalPages = Math.ceil(total / limit);

    return {
      data: vouchers.map(mapVoucherToResource),
      total,
      page,
      limit,
      totalPages,
    };
  }
}
