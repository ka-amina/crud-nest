import { defineConfig } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Employer } from './employers/models/employer.entity';

export default defineConfig({
  driver: PostgreSqlDriver, // this must be the actual driver class
  host: 'localhost',
  port: 5432,
  dbName: 'test_nest',
  user: 'postgres',
  password: 'admin',
  entities: ['./dist/**/*.entity.js'],
  debug: true,
});
