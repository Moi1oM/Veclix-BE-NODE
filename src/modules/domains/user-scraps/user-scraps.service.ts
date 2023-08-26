import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserScrapDto } from './dto/create-user-scrap.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserScrap } from './entities/user-scrap.entity';
import { Repository } from 'typeorm';
import { UserScrapQuery } from './dto/dquery-user-scrap.dto';

@Injectable()
export class UserScrapsService {
  constructor(
    @InjectRepository(UserScrap)
    private readonly userScrapRepository: Repository<UserScrap>,
  ) {}

  async toggleScrap(
    createUserScrapDto: CreateUserScrapDto,
  ): Promise<UserScrap> {
    const { agent_uuid, user_id } = createUserScrapDto;
    const userScrap = await this.userScrapRepository.findOne({
      where: { agent_uuid, user_id },
    });
    if (userScrap) {
      await this.userScrapRepository.delete(userScrap.id);
      return userScrap;
    }
    const newUserScrap = await this.userScrapRepository.create(
      createUserScrapDto,
    );
    await this.userScrapRepository.save(newUserScrap);
    return newUserScrap;
  }

  async findByQuery(query: UserScrapQuery) {
    const realQuery = {};
    if (query.agent_uuid) {
      realQuery['agent_uuid'] = query.agent_uuid;
    }
    if (query.user_id) {
      realQuery['user_id'] = query.user_id;
    }
    const userScrap = await this.userScrapRepository.findOne({
      where: realQuery,
    });
    if (!userScrap) {
      throw new HttpException(
        '해당하는 스크랩이 없습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return userScrap;
  }

  async hasUserScrappedAgent(
    user_id: number,
    agent_uuid: string,
  ): Promise<boolean> {
    const existingScrap = await this.userScrapRepository.findOne({
      where: { user_id, agent_uuid },
    });

    return !!existingScrap;
  }

  async findUserScrappedAgents(user_id: number) {
    const userScraps = await this.userScrapRepository.find({
      where: { user_id },
    });
    return userScraps;
  }
}
