import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

export class UsersRelatedAgentBlockService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
}
