import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './DTO/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  async signUp(
    @Body()
    body: SignUpDTO,
  ) {
    await this.authService.signUp(body);
    return { message: 'Done!' };
  }
}
