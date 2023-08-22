import { Test, TestingModule } from '@nestjs/testing';
import { AgentBlocksService } from './agent-blocks.service';

describe('AgentBlocksService', () => {
  let service: AgentBlocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgentBlocksService],
    }).compile();

    service = module.get<AgentBlocksService>(AgentBlocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
