import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import type { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('/login')
  async login(
    @Body() loginAuthDto: LoginAuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.login(loginAuthDto);
    const isProduction = this.configService.get('NODE_ENV') === 'production';
    response.cookie('refreshToken', result.data.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return {
      message: result.message,
      data: {
        accessToken: result.data.accessToken,
        user: result.data.user,
      },
    };
  }

  @UseGuards(AuthGuard)
  @Post('/logout')
  async logout(@Body('refreshToken') refreshToken: string) {
    return this.authService.logout(refreshToken);
  }
}
