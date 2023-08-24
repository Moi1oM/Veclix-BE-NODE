import { Test, TestingModule } from '@nestjs/testing';
import { AgentBlocksController } from '../agent-blocks.controller';
import { AgentBlocksService } from '../services/agent-blocks.service';

describe('AgentBlocksController', () => {
  let controller: AgentBlocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentBlocksController],
      providers: [AgentBlocksService],
    }).compile();

    controller = module.get<AgentBlocksController>(AgentBlocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
