import { Test, TestingModule } from '@nestjs/testing';
import { VoiceToneController } from '../voice-tone.controller';
import { VoiceToneService } from '../voice-tone.service';

describe('VoiceToneController', () => {
  let controller: VoiceToneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoiceToneController],
      providers: [VoiceToneService],
    }).compile();

    controller = module.get<VoiceToneController>(VoiceToneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
