import { Test, TestingModule } from '@nestjs/testing';
import { EmpAgentsController } from '../emp-agents.controller';
import { EmpAgentsService } from '../emp-agents.service';

describe('EmpAgentsController', () => {
  let controller: EmpAgentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpAgentsController],
      providers: [EmpAgentsService],
    }).compile();

    controller = module.get<EmpAgentsController>(EmpAgentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
