// create-employer.dto.ts
import { Trim } from '@opentecc/nestjs-common';
import { FieldLabel } from '@opentecc/nestjs-core';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';


export class CreateEmployerDto {
  @FieldLabel('Company Name')
  @Trim()
  @IsNotEmpty()
  name: string;

  @FieldLabel('Industry')
  @IsOptional()
  @Trim()
  industry?: string;

  @FieldLabel('Address')
  @IsOptional()
  @Trim()
  address?: string;

  @FieldLabel('Number of Employees')
  @IsOptional()
  @IsNumber()
  noOfEmployees?: number;

  @FieldLabel('Business ID')
  @IsOptional()
  @Trim()
  businessId?: string;
}
