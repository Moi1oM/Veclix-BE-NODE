import { Test, TestingModule } from '@nestjs/testing';
import { ToolBlocksService } from '../services/tool-blocks.service';

describe('ToolBlocksService', () => {
  let service: ToolBlocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToolBlocksService],
    }).compile();

    service = module.get<ToolBlocksService>(ToolBlocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
