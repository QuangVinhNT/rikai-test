import {
  ConflictException,
  Injectable,
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
      message: 'Register successfully!',
      data: newUser,
    };
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
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_KEY,
        expiresIn: '7d',
      }),
    ]);
    await this.prismaService.session.create({
      data: {
        refreshToken,
        userId: userExists.id,
        expiresAt: addDays(new Date(), 7),
      },
    });
    return {
      message: 'Login successfully!',
      data: {
        accessToken,
        refreshToken,
        user: {
          id: userExists.id,
          username: userExists.username,
          email: userExists.email,
        },
      },
    };
  }

  async logout(refreshToken: string) {
    try {
      await this.prismaService.session.delete({
        where: {
          refreshToken,
        },
      });
      return { message: 'Logout successfully!' };
    } catch (error) {
      console.log(error);
      return { message: 'Logout successfully!' };
    }
  }
}
