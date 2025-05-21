import { Module } from '@nestjs/common';
import { ConfigModule } from '@opentecc/nestjs-config'; // Manages environment-based configuration
import { RequestContextModule } from '@opentecc/nestjs-core'; // Provides request context utilities
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule, // Load environment variables and configuration
    RequestContextModule.forRoot(), // Initialize request context for tracking request data
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
