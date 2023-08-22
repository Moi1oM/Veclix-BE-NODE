import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserQueryDto } from './dto/dquery-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    if (await this.existsByEmail(createUserDto.email)) {
      throw new HttpException(
        `User with email:${createUserDto.email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.userRepository.save(createUserDto.toEntity());
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    const foundUser: User = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!foundUser) {
      throw new HttpException(
        `User with email:${email} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return foundUser;
  }

  async findUsersByDQuery(query: UserQueryDto): Promise<User[]> {
    const userList: User[] = await this.userRepository.find({ where: query });
    if (userList.length == 0) {
      throw new HttpException(
        `User with query:${JSON.stringify(query)} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return userList;
  }

  async findOne(id: number): Promise<User> {
    const foundUser: User = await this.userRepository.findOne({
      where: { id: id },
    });
    if (!foundUser) {
      throw new HttpException(
        `User with id:${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return foundUser;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new HttpException(
        `User with id:${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);
    return updatedUser;
  }

  async remove(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new HttpException(
        `User with id:${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userRepository.remove(user);
    return user;
  }

  async softRemove(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new HttpException(
        `User with id:${id} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.userRepository.softRemove(user);
    return user;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const foundUser: User = await this.userRepository.findOne({
      where: { email: email },
    });
    return !!foundUser;
  }
}
