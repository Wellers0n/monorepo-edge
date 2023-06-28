import { Module } from '@nestjs/common';
import { PayablesService } from './payables.service';
import { PayablesController } from './payables.controller';
import { PrismaService } from '@/database/prismaServices';
import { PayablesRepository } from './payables.repository';

@Module({
  controllers: [PayablesController],
  providers: [PrismaService, PayablesService, PayablesRepository],
  exports: [PayablesService],
})
export class PayablesModule {}
