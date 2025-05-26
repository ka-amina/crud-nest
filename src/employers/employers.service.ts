import { Injectable } from '@nestjs/common';
import { BaseService } from '@opentecc/nestjs-core';
import { EmployersRepository } from './employers.repository';
import { CreateEmployerDto } from './models/dto/create-employer.dto';
import { Employer } from './models/employer.entity';

@Injectable()
export class EmployersService extends BaseService {
  constructor(private readonly employersRepository: EmployersRepository) {
    super(); // Initialize base service with logger
  }

  // Create a new employer entity
  async create(dto: CreateEmployerDto): Promise<Employer | null> {
    return await this.employersRepository.create(dto);
  }
  async listPaginated({ page = 1, limit = 10 }): Promise<any> {
    const { data, total } = await this.employersRepository.findPaginated(page, limit);
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
    return this.employersRepository.findById(id);
  }

  async update(id: string, dto: Partial<CreateEmployerDto>) {
    return this.employersRepository.update(id, dto);
  }

  async delete(id: string) {
    return this.employersRepository.delete(id);
  }
}
