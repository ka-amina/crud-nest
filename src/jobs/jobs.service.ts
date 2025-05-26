import { Injectable } from '@nestjs/common';
import { BaseService, ServiceError } from '@opentecc/nestjs-core';
import { JobsRepository } from './jobs.repository';
import { CreateJobDto } from './models/dto/create-job.dto';
import { Job } from './models/job.entity';

@Injectable()
export class JobService extends BaseService {
  constructor(private readonly jobRepository: JobsRepository) {
    super();
  }

  async create(dto: CreateJobDto): Promise<Job> {
    return this.jobRepository.create(dto);
  }

  async listPaginated({ page = 1, limit = 10 }): Promise<any> {
    const { data, total } = await this.jobRepository.findPaginated(page, limit);
    return {
      data,
      meta: {
        total,
        page,
        limit,
      },
    };
  }

  async findById(id: string) {
    return this.jobRepository.findById(id);
  }

  async update(id: string, dto: Partial<CreateJobDto>) {
    return this.jobRepository.update(id, dto);
  }

  async delete(id: string) {
    return this.jobRepository.delete(id);
  }
}
