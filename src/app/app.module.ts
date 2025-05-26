import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@opentecc/nestjs-config'; // Manages environment-based configuration
import { RequestContextModule, RequestLoggerModule } from '@opentecc/nestjs-core'; // Provides request context utilities
import mikroOrmConfig from '../mikro-orm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployersModule } from '../employers/employers.module';
import { JobModule } from 'src/jobs/jobs.module';
import { ApplicationsModule } from 'src/applications/applications.module';


@Module({
  imports: [
    ConfigModule, // Load environment variables and configuration
    RequestContextModule.forRoot(), // Initialize request context for tracking request data
    RequestLoggerModule.forRoot({
      logLevel: 'debug',
      excludePaths: [],
      prettyPrint: false,
      redactedFields: [],
    }),
    MikroOrmModule.forRoot(mikroOrmConfig),
    EmployersModule, 
    JobModule,
    ApplicationsModule,
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
