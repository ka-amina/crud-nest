import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Application } from './models/application.entity';
import { CreateApplicationDto } from './models/dto/create-application.dto';
import { Job } from 'src/jobs/models/job.entity';

@Injectable()
export class ApplicationsRepository {
  constructor(
    @InjectRepository(Application) private repo: EntityRepository<Application>,
    private em: EntityManager,
  ) {}

  async findPaginated(page = 1, limit = 10): Promise<{ data: Application[]; total: number }> {
    const offset = (page - 1) * limit;
    const [data, total] = await this.repo.findAndCount(
      {},
      {
        limit,
        offset,
        populate: ['job'], // Adjust relations if needed
      },
    );
    return { data, total };
  }


  async create(data: CreateApplicationDto): Promise<Application> {
    const job = await this.em.findOneOrFail(Job, data.jobId); // Fetch the employer by ID
      const application = this.repo.create({
        ...data,
        job,
      });
    await this.em.persistAndFlush(application);
    return application;
  }

  async findById(id: string): Promise<Application | null> {
    return this.repo.findOne({ id }, { populate: ['job'] });
  }

  async update(id: string, data: Partial<CreateApplicationDto>): Promise<Application> {
    const app = await this.findById(id);
    if (!app) throw new Error('Application not found');
    this.repo.assign(app, data);
    await this.em.flush();
    return app;
  }

  async delete(id: string): Promise<void> {
    const app = await this.findById(id);
    if (!app) throw new Error('Application not found');
    await this.em.removeAndFlush(app);
  }
}
