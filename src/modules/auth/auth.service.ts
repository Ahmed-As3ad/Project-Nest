import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { HUserDocument } from '../../DB/model';
import { SignUpDTO } from './DTO/auth.dto';
import { UserRepository } from '../../DB/Repository/user.repository.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository
  ) { }
  async signUp(
    data: SignUpDTO,
  ): Promise<{ message: string; user: HUserDocument }> {
    const { fName, lName, email, password } = data;
    const checkUserExist = await this.userRepository.findOne({ filter: { email } });
    if (checkUserExist) {
      throw new ConflictException('Email already exist!');
    }
    const [user] = await this.userRepository.create({data: [{ fName, lName, email, password }]});
    if (!user) {
      throw new BadRequestException('Fail to create User.');
    }
    return { message: 'Done, User Created.', user };
  }
}
