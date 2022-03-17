import { Test, TestingModule } from '@nestjs/testing';
import { AgentWindowsService } from './agent-windows.service';

describe('AgentWindowsService', () => {
  let service: AgentWindowsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgentWindowsService],
    }).compile();

    service = module.get<AgentWindowsService>(AgentWindowsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
