import { AppFactory } from '@opentecc/nestjs-core'; // Utility for creating and starting the NestJS app
import { AppModule } from './app/app.module';

async function bootstrap() {
  // Create the NestJS application with the root module
  const app = await AppFactory.create({
    rootModule: AppModule,
  });

  // Add custom app configurations here (e.g., middleware, global pipes)

  // Start the HTTP server
  await AppFactory.start(app);
}

// Execute the bootstrap function
void bootstrap();