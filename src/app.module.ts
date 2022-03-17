import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentWindowsModule } from './agent-windows/agent-windows.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AgentWindowsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
