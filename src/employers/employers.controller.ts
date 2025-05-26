import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BaseController, OffsetPaginationQuery } from '@opentecc/nestjs-core';
import { EmployersService } from './employers.service';
import { CreateEmployerDto } from './models/dto/create-employer.dto';

@Controller('employers')
export class EmployersController extends BaseController {
  constructor(private readonly employerService: EmployersService) {
    super(); // Initialize base controller with logger
  }

  @Get()
  async findAll(@Query() query: OffsetPaginationQuery) {
    return this.employerService.listPaginated(query);
  }

  @Post()
  async create(@Body() createEmployerDto: CreateEmployerDto) {
    return this.employerService.create(createEmployerDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.employerService.findById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<CreateEmployerDto>) {
    return this.employerService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.employerService.delete(id);
  }

  //   // Retrieve paginated list of employers (public access)
  //   @Get()
  //   @PublicRoute()
  //   async findAll(@Query() pagination: OffsetPaginationQuery) {
  //     return this.employerService.listPaginated(pagination);
  //   }

  //   // Retrieve a single employer by ID
  //   @Get(':id')
  //   async findOne(@Param('id') id: string) {
  //     return this.employerService.findById(id);
  //   }
}
