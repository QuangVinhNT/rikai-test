import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface RequestWithCookies extends Request {
  cookies: {
    refreshToken?: string;
    accessToken?: string;
    userRole?: string;
    [key: string]: string | undefined;
  };
}

interface JwtPayload {
  userId: string;
  role: 'USER' | 'ADMIN';
}

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithCookies>();

    // 1. Lấy refresh token từ cookie
    const token = request.cookies?.['refreshToken'];

    if (!token) {
      throw new UnauthorizedException('Không tìm thấy Refresh Token');
    }

    try {
      // 2. Verify token
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_KEY,
      });

      // 3. Gán payload và token vào request để Controller dùng
      request['user'] = { ...payload, refreshToken: token };
    } catch {
      throw new UnauthorizedException('Refresh Token invalid or expire');
    }

    return true;
  }
}
