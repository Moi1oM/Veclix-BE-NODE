import { User } from '../../entities/user.entity';

export const userStub = (): User => {
  const user = new User();
  user.id = 1;
  user.email = 'hcloud0806@gmail.com';
  user.username = 'moi';
  user.vcoin = 0;
  user.discordId = '1231627951';
  user.createdAt = new Date();
  user.updatedAt = new Date();
  return user;
};
