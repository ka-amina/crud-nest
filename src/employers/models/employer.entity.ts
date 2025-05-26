import { BeforeCreate, BeforeUpdate, Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseEntity } from '@opentecc/nestjs-common';
import { v4 as uuidv4 } from 'uuid';
import { Job } from '../../jobs/models/job.entity';

@Entity({ tableName: 'employers' }) // Map to the 'employers' collection in MongoDB
export class Employer extends BaseEntity {
  @PrimaryKey()
  id: string = uuidv4();

  @Property()
  name: string;

  @Property({ nullable: true })
  industry?: string;

  @Property({ nullable: true })
  address?: string;

  @Property({ nullable: true, type: 'int' })
  noOfEmployees?: number;

  @Property({ nullable: true })
  businessId?: string;

  @Property()
  createdAt: Date = new Date(); // Timestamp for entity creation

  @Property()
  updatedAt: Date = new Date(); // Timestamp for last update

  @OneToMany(() => Job, (job) => job.employer)
  jobs = new Collection<Job>(this);

  // Set creation timestamps before inserting the entity
  @BeforeCreate()
  setCreatedAt() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Update timestamp before updating the entity
  @BeforeUpdate()
  setUpdatedAt() {
    this.updatedAt = new Date();
  }
}
