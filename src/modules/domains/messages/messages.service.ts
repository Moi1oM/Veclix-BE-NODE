import { HttpException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import { CyclesService } from '../cycles/cycles.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @Inject(forwardRef(() => CyclesService))
    private readonly cyclesService: CyclesService,
  ) {}

  async findMyMessage(userId: number): Promise<Message[]> {
    return await this.messageRepository
      .createQueryBuilder('message')
      .innerJoinAndSelect('message.cycle', 'cycle')
      .innerJoinAndSelect('cycle.agentBlock', 'empAgent')
      .innerJoinAndSelect('empAgent.owner', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  async findWithCycleId(cycleId: string): Promise<Message[]> {
    return await this.messageRepository.find({
      where: { cycle_id: cycleId },
      order: { createdAt: 'ASC' },
    });
  }

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const cycle = await this.cyclesService.findCycleByIdOrException(
      createMessageDto.cycle_id,
    );
    const data = {
      ...createMessageDto,
      cycle,
    };
    return await this.messageRepository.save(data);
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find();
  }

  async findOneByIdOrException(id: string): Promise<Message> {
    const message = await this.messageRepository.findOne({ where: { id: id } });
    if (!message) {
      throw new HttpException(`Message not found with ${id}`, 404);
    }
    return message;
  }

  async update(
    id: string,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    await this.findOneByIdOrException(id);
    await this.messageRepository.update(id, updateMessageDto);
    return await this.findOneByIdOrException(id);
  }

  async remove(id: string): Promise<Message> {
    const message = await this.findOneByIdOrException(id);
    await this.messageRepository.delete(id);
    return message;
  }
}
