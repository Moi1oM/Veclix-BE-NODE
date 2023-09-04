import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRunDto } from './dto/create-run.dto';
import { UpdateRunDto } from './dto/update-run.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Run } from './entities/run.entity';
import { Repository } from 'typeorm';
import { CyclesService } from '../cycles/cycles.service';
import { TaskBlocksService } from '../task-blocks/task-blocks.service';

@Injectable()
export class RunsService {
  constructor(
    @InjectRepository(Run)
    private readonly runRepository: Repository<Run>,
    private readonly cyclesService: CyclesService,
    private readonly taskBlocksService: TaskBlocksService,
  ) {}

  async findMyRun(userId: number): Promise<Run[]> {
    // find agentBlock with userId
    const cycles = await this.cyclesService.findMyCycle(userId);
    const runs: Run[] = [];
    for (const cycle of cycles) {
      const newRuns = await cycle.runs;
      runs.push(...newRuns);
    }
    return runs;
  }

  async create(createRunDto: CreateRunDto): Promise<Run> {
    const cycle = await this.cyclesService.findCycleByIdOrException(
      createRunDto.cycleId,
    );
    const taskBlock = await this.taskBlocksService.findByIdOrException(
      createRunDto.taskBlockId,
    );
    const data = {
      ...createRunDto,
      cycle,
      taskBlock,
    };
    const run = this.runRepository.create(data);
    return await this.runRepository.save(run);
  }

  async findAll(): Promise<Run[]> {
    return await this.runRepository.find();
  }

  async findOneByIdOrException(id: string): Promise<Run> {
    const run = await this.runRepository.findOne({ where: { id: id } });
    if (!run) {
      throw new HttpException(
        `Run with id ${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return run;
  }

  async update(id: string, updateRunDto: UpdateRunDto): Promise<Run> {
    await this.findOneByIdOrException(id);
    await this.runRepository.update(id, updateRunDto);
    return await this.findOneByIdOrException(id);
  }

  async remove(id: string): Promise<Run> {
    const run = await this.findOneByIdOrException(id);
    await this.runRepository.delete(id);
    return run;
  }
}
