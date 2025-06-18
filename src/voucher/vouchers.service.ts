import { PrismaClient, Voucher } from "@prisma/client";
import { CreateVoucherDto } from "./dto/create-voucher.dto";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class VouchersService {
  constructor(
    @Inject('VOUCHER_MODEL') private readonly db: () => PrismaClient['voucher'],
  ) {}

  async create(createVoucherDto: CreateVoucherDto): Promise<void> {
    await this.db().create({
      data: createVoucherDto
    });
    return;
  }

  async get(id: number): Promise<Voucher> {
    const voucher = await this.db().findUnique({
      where: { id },
    });
    if (!voucher) {
      throw new NotFoundException(`Voucher with ID ${id} not found`);
    }
    return voucher;
  }

  async findAll(): Promise<Voucher[]> {
    return await this.db().findMany();
  }
}
