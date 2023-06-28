import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prismaServices';
import { PayableEntity } from './entities/payables.entity';
import { CreatePayableDataDTO } from './dtos/create-payable.dto';
import { FindPayableDataDTO } from './dtos/find-payable.dto';
import { UpdatePayableDataDTO } from './dtos/update-payable.dto';
import { FindOnePayableDataDTO } from './dtos/find-one-payable.dto';

@Injectable()
export class PayablesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    value,
    valueInCents,
    emissionDate,
    assignorId,
    userId,
  }: CreatePayableDataDTO): Promise<PayableEntity> {
    return this.prisma.payable.create({
      data: {
        value,
        valueInCents,
        emissionDate,
        assignorId,
        userId,
      },
    });
  }

  async findAll(data: FindPayableDataDTO): Promise<PayableEntity[]> {
    const { emissionDate, assignorId } = data;
    return this.prisma.payable.findMany({
      where: {
        emissionDate,
        assignorId,
      },
    });
  }
  async findOne(data: FindOnePayableDataDTO): Promise<PayableEntity> {
    const { id } = data;
    return this.prisma.payable.findFirst({
      where: {
        id,
      },
    });
  }

  async delete(id: number): Promise<void> {
    const payableExist = await this.prisma?.payable?.findFirst({
      where: {
        id,
      },
    });

    if (!payableExist) return;

    await this.prisma?.payable?.delete({
      where: {
        id,
      },
    });
  }

  async update(data: UpdatePayableDataDTO): Promise<PayableEntity> {
    const { id, value, valueInCents } = data;

    return this.prisma.payable.update({
      data: {
        value,
        valueInCents,
      },
      where: {
        id,
      },
    });
  }
}
