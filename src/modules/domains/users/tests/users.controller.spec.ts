import { Test } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { Logger } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { userStub } from './stubs/user.stub';
import { User } from '../entities/user.entity';

jest.mock('../services/users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, Logger],
    }).compile();
    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('find', () => {
    describe('when findOne is called', () => {
      let user: User;
      beforeEach(async () => {
        user = await usersController.findOne(userStub().id.toString());
      });

      test('then it should call usersService', () => {
        expect(usersService.findOne).toBeCalledWith(userStub().id);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
