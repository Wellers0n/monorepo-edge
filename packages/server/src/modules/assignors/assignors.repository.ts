import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prismaServices';
import { AssignorEntity } from './entities/assignors.entity';
import { CreateAssignorDataDTO } from './dtos/create-assignor.dto';
import { FindAssignorDataDTO } from './dtos/find-assignor.dto';
import { UpdateAssignorDataDTO } from './dtos/update-assignor.dto';

@Injectable()
export class AssignorsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({
    name,
    email,
    phone,
    document,
    userId,
  }: CreateAssignorDataDTO): Promise<AssignorEntity> {
    return this.prisma.assignor.create({
      data: {
        name,
        email,
        phone,
        document,
        userId,
      },
    });
  }
  async findByEmail(email: string): Promise<AssignorEntity> {
    return this.prisma.assignor.findFirst({
      where: {
        email,
      },
    });
  }

  async findAll(data: FindAssignorDataDTO): Promise<AssignorEntity[]> {
    const { email, name, phone, document } = data;
    return this.prisma.assignor.findMany({
      where: {
        email: {
          contains: email,
        },
        name: {
          contains: name,
        },
        phone: {
          contains: phone,
        },
        document: {
          contains: document,
        },
      },
    });
  }
  async findOne(id: number): Promise<AssignorEntity> {
    return this.prisma.assignor.findFirst({
      where: {
        id,
      },
    });
  }

  async delete(id: number): Promise<void> {
    const assignorExist = await this.prisma?.assignor?.findFirst({
      where: {
        id,
      },
    });

    if (!assignorExist) return;

    await this.prisma?.assignor?.delete({
      where: {
        id,
      },
    });
  }

  async update(data: UpdateAssignorDataDTO): Promise<AssignorEntity> {
    const { id, name, email, document, phone } = data;

    return this.prisma.assignor.update({
      data: {
        name,
        email,
        document,
        phone,
      },
      where: {
        id,
      },
    });
  }
}
