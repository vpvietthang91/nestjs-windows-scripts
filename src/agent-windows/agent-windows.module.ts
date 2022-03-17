import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AgentWindowsScriptProviders } from './agent-windows-script.providers';
import { AgentWindowsController } from './agent-windows.controller';
import { AgentWindowsService } from './agent-windows.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AgentWindowsController],
  providers: [
    ...AgentWindowsScriptProviders,
    AgentWindowsService],
})
export class AgentWindowsModule {}
