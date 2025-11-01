import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { HUserDocument } from '../../DB/model';
import { signInDTO, SignUpDTO } from './DTO/auth.dto';
import { UserRepository } from '../../DB/Repository/user.repository.js';
import { compareHash } from '../../common/utils/security/hash.utils.js';

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
    const [user] = await this.userRepository.create({ data: [{ fName, lName, email, password }] });
    if (!user) {
      throw new BadRequestException('Fail to create User.');
    }
    return { message: 'Done, User Created.', user };
  }

  async signIn(data: signInDTO): Promise<{ message: string; user: HUserDocument }> {
    const { email, password } = data;
    const user = await this.userRepository.findOne({ filter: { email } });
    if (!user) {
      throw new BadRequestException('Invalid credentials.');
    }
    if (!await compareHash({ plaintext: password, hash: user.password })) {
      throw new BadRequestException('Invalid credentials.');
    }
    return { message: 'Done, User Logged in.', user };
  }
}
