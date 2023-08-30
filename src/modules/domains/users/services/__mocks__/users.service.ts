import { userStub } from '../../tests/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  save: jest.fn().mockResolvedValue(userStub()),
  create: jest.fn().mockResolvedValue(userStub()),
  findAll: jest.fn().mockResolvedValue([userStub()]),
  findByEmailOrCreate: jest.fn().mockResolvedValue(userStub()),
  findUsersByDQuery: jest.fn().mockResolvedValue([userStub()]),
  findOne: jest.fn().mockResolvedValue(userStub()),
  update: jest.fn().mockResolvedValue(userStub()),
  remove: jest.fn().mockResolvedValue(userStub()),
  softRemove: jest.fn().mockResolvedValue(userStub()),
  existsByEmail: jest.fn().mockResolvedValue(false),
  findUserByEmail: jest.fn().mockResolvedValue(userStub()),
});
