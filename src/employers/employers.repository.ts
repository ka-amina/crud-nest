// employers.repository.ts
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateEmployerDto } from './models/dto/create-employer.dto';
import { Employer } from './models/employer.entity';

@Injectable()
export class EmployersRepository {
  constructor(
    @InjectRepository(Employer)
    private readonly repository: EntityRepository<Employer>,

    private readonly em: EntityManager,
  ) {}

  async create(data: CreateEmployerDto): Promise<Employer> {
    const employer = this.repository.create(data);
    await this.em.persistAndFlush(employer);
    return employer;
  }

  async findPaginated(page = 1, limit = 10): Promise<{ data: Employer[]; total: number }> {
    const offset = (page - 1) * limit;
    const [data, total] = await this.repository.findAndCount(
      {},
      {
        limit,
        offset,
        orderBy: { createdAt: 'DESC' },
      },
    );

    return { data, total };
  }

  async findById(id: string) {
    return this.repository.findOne({ id });
  }

  async update(id: string, data: Partial<CreateEmployerDto>): Promise<Employer> {
    const employer = await this.findById(id);
    if (!employer) throw new Error('Employer not found');

    this.repository.assign(employer, data);
    await this.em.flush();
    return employer;
  }

  async delete(id: string): Promise<void> {
    const employer = await this.findById(id);
    if (!employer) throw new Error('Employer not found');

    await this.em.removeAndFlush(employer);
  }
}
