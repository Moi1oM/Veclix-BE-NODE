import { Test, TestingModule } from '@nestjs/testing';
import { AgentTagsController } from '../agent_tags.controller';
import { AgentTagsService } from '../services/agent_tags.service';

describe('AgentTagsController', () => {
  let controller: AgentTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgentTagsController],
      providers: [AgentTagsService],
    }).compile();

    controller = module.get<AgentTagsController>(AgentTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
