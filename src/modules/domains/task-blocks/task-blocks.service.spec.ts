import { Test, TestingModule } from '@nestjs/testing';
import { TaskBlocksService } from './task-blocks.service';

describe('TaskBlocksService', () => {
  let service: TaskBlocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskBlocksService],
    }).compile();

    service = module.get<TaskBlocksService>(TaskBlocksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
