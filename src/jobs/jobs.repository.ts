import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { Job } from "./models/job.entity";
import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { CreateJobDto } from "./models/dto/create-job.dto";
import { Employer } from "src/employers/models/employer.entity";
import { ServiceError } from "@opentecc/nestjs-core";

@Injectable()
export class JobsRepository {
  constructor(
    @InjectRepository(Job)
    private readonly repository: EntityRepository<Job>,
    private readonly em: EntityManager,
  ) {}

  async create(data: CreateJobDto): Promise<Job> {
  const employer = await this.em.findOneOrFail(Employer, data.employerId); // Fetch the employer by ID
  const job = this.repository.create({
    ...data,
    employer,
  });
  await this.em.persistAndFlush(job);
  return job;
}

  async findPaginated(page = 1, limit = 10): Promise<{ data: Job[]; total: number }> {
      const offset = (page - 1) * limit;
    const [data, total] = await this.repository.findAndCount({}, {
      limit,
      offset,
      populate: ['employer'],
      orderBy: { createdAt: 'DESC' },
    });

    return { data, total };
  }

  async findById(id: string): Promise<Job | null> {
    return this.repository.findOne({ id }, {populate: ['employer'],});
  }

  async update(id: string, data: Partial<CreateJobDto>): Promise<Job> {
    const job = await this.findById(id);
    if (!job) throw new Error('Job not found');

    this.repository.assign(job, data);
    await this.em.flush();
    return job;
  }

  async delete(id: string): Promise<void> {
    const job = await this.findById(id);
    if (!job) throw new Error('Job not found');

    await this.em.removeAndFlush(job);
  }
}
