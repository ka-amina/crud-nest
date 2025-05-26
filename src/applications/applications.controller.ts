import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { CreateApplicationDto } from './models/dto/create-application.dto';
import { OffsetPaginationQuery } from '@opentecc/nestjs-core';

@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationService: ApplicationsService) {}

  @Post()
  create(@Body() dto: CreateApplicationDto) {
    return this.applicationService.create(dto);
  }

  @Get()
  async findAll(@Query() query: OffsetPaginationQuery) {
    return this.applicationService.listPaginated(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.applicationService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<CreateApplicationDto>) {
    return this.applicationService.update(id, dto);
  }

  @Delete(':id')
async delete(@Param('id') id: string) {
    return this.applicationService.delete(id);
  }
}
