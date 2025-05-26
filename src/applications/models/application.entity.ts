import { BaseEntity, Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
import { Job } from '../../jobs/models/job.entity';

@Entity({ tableName: 'applications' })
export class Application extends BaseEntity {
  @PrimaryKey()
  id: string = uuidv4();

  @Property()
  applicationName: string;

  @Property()
  resumeUrl: string;

  @Property()
  applieAt: Date = new Date();

  @ManyToOne(() => Job)
  job: Job;
}
