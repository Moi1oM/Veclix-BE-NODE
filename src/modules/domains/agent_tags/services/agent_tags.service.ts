import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgentTag } from '../entities/agent_tag.entity';
import { Repository } from 'typeorm';
import { AgentBlocksService } from '../../agent-blocks/services/agent-blocks.service';
import { TagsService } from '../../tags/services/tags.service';
import { AgentTagDQuery } from '../dto/dquery-agent-tag.dto';

@Injectable()
export class AgentTagsService {
  constructor(
    @InjectRepository(AgentTag)
    private readonly agentTagRepository: Repository<AgentTag>,
    private readonly agentBlocksService: AgentBlocksService,
    private readonly tagsService: TagsService,
  ) {}

  async existsOrCreate(
    agent_uuid: string,
    tag_name: string,
  ): Promise<AgentTag> {
    const tag = await this.tagsService.findOneOrCreate(tag_name);
    const tagAgent = await this.agentTagRepository.findOne({
      where: { agent_uuid, tag_id: tag.id },
      relations: ['agentBlock', 'tag'],
    });
    if (tagAgent) return tagAgent;
    const newTagAgent = await this.create(agent_uuid, tag_name);
    return newTagAgent;
  }

  async create(agent_uuid: string, tag_name: string): Promise<AgentTag> {
    const agentBlock = await this.agentBlocksService.findOne(agent_uuid);
    const tag = await this.tagsService.findOneOrCreate(tag_name);
    const agentTag = await this.agentTagRepository.create({
      agentBlock,
      tag,
      agent_uuid: agentBlock.id,
      tag_id: tag.id,
    });
    await this.agentTagRepository.save(agentTag);
    return agentTag;
  }

  async findAll() {
    return await this.agentTagRepository.find();
  }

  async findAgentTagsByQuery(query: AgentTagDQuery): Promise<AgentTag[]> {
    let realQuery = {};
    if (query.tag_name) {
      const tag = await this.tagsService.findOneOrCreate(query.tag_name);
      realQuery = { ...realQuery, tag_id: tag.id };
    }
    if (query.agent_uuid) {
      realQuery = { ...realQuery, agent_uuid: query.agent_uuid };
    }
    console.log(realQuery);
    const agentTags = await this.agentTagRepository.find({
      where: realQuery,
      relations: ['agentBlock', 'tag'],
    });
    if (!agentTags) {
      throw new HttpException(
        `No matching agent-tag with query: ${query}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return agentTags;
  }

  async remove(agent_uuid: string, tag_name: string) {
    const agentTag = await this.existsOrCreate(agent_uuid, tag_name);
    await this.agentTagRepository.delete(agentTag.id);
  }
}
