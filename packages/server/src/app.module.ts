import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AssignorsModule } from './modules/assignors/assignors.module';
import { PayablesModule } from './modules/payables/payables.module';

@Module({
  imports: [UsersModule, AuthModule, AssignorsModule, PayablesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
