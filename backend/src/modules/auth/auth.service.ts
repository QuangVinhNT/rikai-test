import { ConflictException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../../prisma/prisma.service';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
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

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
