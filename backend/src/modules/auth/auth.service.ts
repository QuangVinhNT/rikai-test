import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../prisma/prisma.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import addDays from '@/libs/addDays';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerAuthDto: RegisterAuthDto) {
    const { username, email, password, fullName } = registerAuthDto;
    const userExists = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
    if (userExists) {
      throw new ConflictException('User or Email is exist!');
    }
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    try {
      const newUser = await this.prismaService.user.create({
        data: {
          username,
          email,
          fullName,
          password: hashedPassword,
        },
        select: {
          username: true,
          email: true,
        },
      });
      return {
        success: true,
        message: 'Register successfully!',
        data: newUser,
      };
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Not found error!`);
        }
        if (error.code === 'P2002') {
          throw new ConflictException('Exist data error!');
        }
      }
      throw error;
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { username, password } = loginAuthDto;
    const userExists = await this.prismaService.user.findFirst({
      where: {
        OR: [{ username: username }, { email: username }],
      },
    });
    if (!userExists) {
      throw new UnauthorizedException(
        'Username/email or password is incorrect!',
      );
    }
    const isPasswordMatched = await bcrypt.compare(
      password,
      userExists.password,
    );
    if (!isPasswordMatched) {
      throw new UnauthorizedException(
        'Username/email or password is incorrect!',
      );
    }
    const payload = {
      userId: userExists.id,
      role: userExists.role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(
        {
          userId: userExists.id,
        },
        {
          secret: process.env.JWT_REFRESH_KEY,
          expiresIn: '7d',
        },
      ),
    ]);
    try {
      await this.prismaService.session.create({
        data: {
          refreshToken,
          userId: userExists.id,
          expiresAt: addDays(new Date(), 7),
        },
      });
      return {
        success: true,
        message: 'Login successfully!',
        data: {
          accessToken,
          refreshToken,
          user: {
            id: userExists.id,
            username: userExists.username,
            role: userExists.role,
          },
        },
      };
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error) {
        if (error.code === 'P2025') {
          throw new NotFoundException(`Not found error!`);
        }
        if (error.code === 'P2002') {
          throw new ConflictException('Exist data error!');
        }
      }
      throw error;
    }
  }

  async logout(refreshToken: string) {
    try {
      await this.prismaService.session.delete({
        where: {
          refreshToken: refreshToken,
        },
      });
      return {
        message: 'Logout successfully!',
        success: true,
      };
    } catch (error) {
      console.log(error);
      return {
        message: 'Logout successfully!',
        success: true,
      };
    }
  }

  async refreshTokens(refreshToken: string | undefined) {
    const token = await this.prismaService.session.findUnique({
      where: {
        refreshToken: refreshToken,
      },
    });
    if (!token) {
      throw new UnauthorizedException('Token is not exist');
    }
    const user = await this.prismaService.user.findUnique({
      where: {
        id: token.userId,
      },
    });
    if (!user) {
      throw new NotFoundException('User is not exist!');
    }
    const payload = {
      userId: user.id,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      success: true,
      message: 'Re-login successfully!',
      data: {
        accessToken,
      },
    };
  }
}
