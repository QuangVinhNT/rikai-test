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
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromCookie(
    request: RequestWithCookies,
  ): string | undefined {
    const token = request.cookies?.['accessToken'];
    return token || undefined;
  }
}
