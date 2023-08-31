import { Test, TestingModule } from '@nestjs/testing';
import { EmpAgentsService } from './emp-agents.service';

describe('EmpAgentsService', () => {
  let service: EmpAgentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmpAgentsService],
    }).compile();

    service = module.get<EmpAgentsService>(EmpAgentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
