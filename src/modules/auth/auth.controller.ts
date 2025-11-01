import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signInDTO, SignUpDTO } from './DTO/auth.dto';

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

  @HttpCode(200)
  @Post('signin')
  async signIn(
    @Body()
    body: signInDTO,
  ) {
    await this.authService.signIn(body);
    return { message: 'Logged in successfully!' };
  }
}
