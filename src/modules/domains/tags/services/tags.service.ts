import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dto/create-tag.dto';
import { Tag } from '../entities/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto) {
    return await this.tagsRepository.save(createTagDto);
  }

  async findAll() {
    return await this.tagsRepository.find();
  }

  async findOneOrCreate(name: string) {
    const tag = await this.tagsRepository.findOne({
      where: { name: name },
      order: { createdAt: 'DESC' },
    });
    if (tag) {
      return tag;
    }
    return await this.tagsRepository.save({ name });
  }

  async remove(name: number) {
    return await this.tagsRepository.delete(name);
  }
}
