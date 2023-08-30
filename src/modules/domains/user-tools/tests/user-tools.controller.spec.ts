import { Test, TestingModule } from '@nestjs/testing';
import { UserToolsController } from '../user-tools.controller';
import { UserToolsService } from '../user-tools.service';

describe('UserToolsController', () => {
  let controller: UserToolsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserToolsController],
      providers: [UserToolsService],
    }).compile();

    controller = module.get<UserToolsController>(UserToolsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
