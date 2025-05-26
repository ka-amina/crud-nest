import { Injectable } from '@nestjs/common';
import { BaseService } from '@opentecc/nestjs-core';
import { ApplicationsRepository } from './applications.repository';
import { Application } from './models/application.entity';
import { CreateApplicationDto } from './models/dto/create-application.dto';

@Injectable()
export class ApplicationsService extends BaseService {
  constructor(private readonly applicationRepository: ApplicationsRepository) {
    super();
  }

  async listPaginated({ page = 1, limit = 10 }): Promise<any> {
    const { data, total } = await this.applicationRepository.findPaginated(page, limit);
    return {
      data,
      meta: {
        total,
        page,
        limit,
      },
    };
  }
  async create(dto: CreateApplicationDto): Promise<Application> {
    return this.applicationRepository.create(dto);
  }

  async findById(id: string): Promise<Application | null> {
    return this.applicationRepository.findById(id);
  }

  async update(id: string, dto: Partial<CreateApplicationDto>): Promise<Application> {
    return this.applicationRepository.update(id, dto);
  }

  async delete(id: string): Promise<void> {
    return this.applicationRepository.delete(id);
  }
}
