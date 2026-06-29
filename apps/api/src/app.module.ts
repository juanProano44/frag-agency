import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { HealthController } from './modules/health/health.controller';
import { ServicesController } from './modules/services/services.controller';
import { ServicesService } from './modules/services/services.service';
import { ProjectsController } from './modules/projects/projects.controller';
import { ProjectsService } from './modules/projects/projects.service';
import { ContactController } from './modules/contact/contact.controller';
import { ContactService } from './modules/contact/contact.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    PrismaModule,
  ],
  controllers: [
    HealthController,
    ServicesController,
    ProjectsController,
    ContactController,
  ],
  providers: [ServicesService, ProjectsService, ContactService],
})
export class AppModule {}
