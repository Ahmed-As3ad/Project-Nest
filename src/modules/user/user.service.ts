import { Injectable } from '@nestjs/common';
import { IUser } from '../../common';

@Injectable()
export class UserService {
  constructor() {}
  getUsers(): IUser[] {
    return [
      { id: 1, name: 'user1', email: 'user1@test.com' },
      { id: 2, name: 'user2', email: 'user2@test.com' },
      { id: 3, name: 'user3', email: 'user3@test.com' },
    ];
  }
}
