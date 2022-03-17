import { Test, TestingModule } from '@nestjs/testing';
import { AgentWindowsController } from './agent-windows.controller';

describe('AgentWindowsController', () => {
  let controller: AgentWindowsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentWindowsController],
    }).compile();

    controller = module.get<AgentWindowsController>(AgentWindowsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
