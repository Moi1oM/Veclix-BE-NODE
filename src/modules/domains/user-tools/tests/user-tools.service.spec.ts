import { Test, TestingModule } from '@nestjs/testing';
import { UserToolsService } from '../user-tools.service';

describe('UserToolsService', () => {
  let service: UserToolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserToolsService],
    }).compile();

    service = module.get<UserToolsService>(UserToolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
