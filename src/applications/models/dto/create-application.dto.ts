import { Trim } from '@opentecc/nestjs-common';
import { FieldLabel } from '@opentecc/nestjs-core';
import { IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {
  @FieldLabel('Applicant Name')
  @Trim()
  @IsNotEmpty()
  applicationName: string;

  @FieldLabel('Resume URL')
  @Trim()
  @IsNotEmpty()
  resumeUrl: string;

  @FieldLabel('Job ID')
  @Trim()
  @IsNotEmpty()
  jobId: string;
}
