import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';

interface RequestWithCookies extends Request {
  cookies: {
    refreshToken?: string;
    [key: string]: string | undefined;
  };
}

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

  @Post('/logout')
  async logout(@Req() req: RequestWithCookies) {
    const refreshToken = req.cookies?.['refreshToken'];
    if (!refreshToken || refreshToken.trim() === '') {
      return { message: 'Logout successfully!' };
    }
    return this.authService.logout(refreshToken);
  }
}
