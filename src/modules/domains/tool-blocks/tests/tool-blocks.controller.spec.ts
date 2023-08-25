import { Test, TestingModule } from '@nestjs/testing';
import { ToolBlocksController } from '../tool-blocks.controller';
import { ToolBlocksService } from '../services/tool-blocks.service';

describe('ToolBlocksController', () => {
  let controller: ToolBlocksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToolBlocksController],
      providers: [ToolBlocksService],
    }).compile();

    controller = module.get<ToolBlocksController>(ToolBlocksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
