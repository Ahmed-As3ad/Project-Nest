import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(protected readonly userService: UserService) {}
  @Get('allUsers')
  getUsers() {
    const users = this.userService.getUsers();
    return { message: 'Done!', users };
  }
}
