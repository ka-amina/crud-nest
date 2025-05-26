import { Module } from '@nestjs/common';
import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { Employer } from './models/employer.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EmployersRepository } from './employers.repository';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Employer] }),
  ],
  providers: [EmployersService, EmployersRepository],
  controllers: [EmployersController]
})
export class EmployersModule {}
