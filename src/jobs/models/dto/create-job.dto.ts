import { FieldLabel } from '@opentecc/nestjs-core';
import { Trim } from '@opentecc/nestjs-common';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateJobDto {
  @FieldLabel('Job Title')
  @Trim()
  @IsNotEmpty()
  title: string;

  @FieldLabel('Description')
  @Trim()
  @IsNotEmpty()
  descritpion: string;

  @FieldLabel('Location')
  @IsOptional()
  @Trim()
  location?: string;

  @FieldLabel('Employer ID')
  @Trim()
  @IsNotEmpty()
  employerId: string;
}
