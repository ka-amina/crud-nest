import { Module } from '@nestjs/common';
import { JobService } from './jobs.service';
import { JobController } from './jobs.controller';
import { JobsRepository } from './jobs.repository';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Job } from './models/job.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Job] }), // Register the Job entity
  ],
  providers: [JobService,JobsRepository],
  controllers: [JobController]
})
export class JobModule {}
