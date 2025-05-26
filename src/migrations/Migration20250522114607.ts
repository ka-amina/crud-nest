import { Migration } from '@mikro-orm/migrations';

export class Migration20250522114607 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "employers" ("id" varchar(255) not null, "name" varchar(255) not null, "industry" varchar(255) null, "address" varchar(255) null, "no_of_employees" int null, "business_id" varchar(255) null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "employers_pkey" primary key ("id"));`);

    this.addSql(`create table "jobs" ("id" varchar(255) not null, "title" varchar(255) not null, "descritpion" varchar(255) not null, "location" varchar(255) null, "created_at" timestamptz not null, "employer_id" varchar(255) not null, constraint "jobs_pkey" primary key ("id"));`);

    this.addSql(`create table "applications" ("id" varchar(255) not null, "application_name" varchar(255) not null, "resume_url" varchar(255) not null, "applie_at" timestamptz not null, "job_id" varchar(255) not null, constraint "applications_pkey" primary key ("id"));`);

    this.addSql(`alter table "jobs" add constraint "jobs_employer_id_foreign" foreign key ("employer_id") references "employers" ("id") on update cascade;`);

    this.addSql(`alter table "applications" add constraint "applications_job_id_foreign" foreign key ("job_id") references "jobs" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "jobs" drop constraint "jobs_employer_id_foreign";`);

    this.addSql(`alter table "applications" drop constraint "applications_job_id_foreign";`);

    this.addSql(`drop table if exists "employers" cascade;`);

    this.addSql(`drop table if exists "jobs" cascade;`);

    this.addSql(`drop table if exists "applications" cascade;`);
  }

}
