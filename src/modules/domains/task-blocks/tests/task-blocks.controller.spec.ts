import { Test, TestingModule } from '@nestjs/testing';
import { TaskBlocksController } from './task-blocks.controller';
import { TaskBlocksService } from './task-blocks.service';

describe('TaskBlocksController', () => {
  let controller: TaskBlocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskBlocksController],
      providers: [TaskBlocksService],
    }).compile();

    controller = module.get<TaskBlocksController>(TaskBlocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
