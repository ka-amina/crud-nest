import { BaseEntity, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Application } from '../../applications/models/application.entity';
import { Employer } from '../../employers/models/employer.entity';
import { v4 as uuidv4 } from 'uuid';

@Entity({ tableName: 'jobs' })
export class Job extends BaseEntity {
  @PrimaryKey()
id: string = uuidv4();

  @Property()
  title: string;

  @Property()
  descritpion: string;

  @Property({ nullable: true })
  location?: string;

  @Property()
  createdAt: Date = new Date();

  @ManyToOne(() => Employer)
  employer: Employer;

  @OneToMany(() => Application, (application) => application.job)
  application = new Collection<Application>(this);
}
