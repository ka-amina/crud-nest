import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JobService } from './jobs.service';
import { CreateJobDto } from './models/dto/create-job.dto';
import { OffsetPaginationQuery } from '@opentecc/nestjs-core';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Post()
  create(@Body() dto: CreateJobDto) {
    return this.jobService.create(dto);
  }

  @Get()
  async findAll(@Query() query: OffsetPaginationQuery) {
    return this.jobService.listPaginated(query);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.jobService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateJobDto>) {
    return this.jobService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.jobService.delete(id);
  }
}
