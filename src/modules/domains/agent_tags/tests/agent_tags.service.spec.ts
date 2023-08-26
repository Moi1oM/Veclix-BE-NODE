import { Test, TestingModule } from '@nestjs/testing';
import { AgentTagsService } from './agent_tags.service';

describe('AgentTagsService', () => {
  let service: AgentTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgentTagsService],
    }).compile();

    service = module.get<AgentTagsService>(AgentTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
