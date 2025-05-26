import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { ApplicationsRepository } from './applications.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Application } from './models/application.entity';

@Module({
  imports: [
      MikroOrmModule.forFeature({ entities: [Application] }), // Register the Job entity
    ],
  providers: [ApplicationsService,ApplicationsRepository],
  controllers: [ApplicationsController]
})
export class ApplicationsModule {}
