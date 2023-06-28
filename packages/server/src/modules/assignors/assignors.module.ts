import { Module } from '@nestjs/common';
import { AssignorsService } from './assignors.service';
import { AssignorsController } from './assignors.controller';
import { PrismaService } from '@/database/prismaServices';
import { AssignorsRepository } from './assignors.repository';

@Module({
  controllers: [AssignorsController],
  providers: [PrismaService, AssignorsService, AssignorsRepository],
  exports: [AssignorsService],
})
export class AssignorsModule {}
