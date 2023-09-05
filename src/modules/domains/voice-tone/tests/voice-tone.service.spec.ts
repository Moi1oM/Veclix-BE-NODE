import { Test, TestingModule } from '@nestjs/testing';
import { VoiceToneService } from '../voice-tone.service';

describe('VoiceToneService', () => {
  let service: VoiceToneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoiceToneService],
    }).compile();

    service = module.get<VoiceToneService>(VoiceToneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
