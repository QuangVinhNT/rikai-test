import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prismaService.user.findMany({
        skip: skip,
        take: limit,
        orderBy: [{ fullName: 'asc' }, { createdAt: 'desc' }],
        select: {
          id: true,
          fullName: true,
          username: true,
          email: true,
          role: true,
          isLocked: true,
          createdAt: true,
        },
      }),
      this.prismaService.user.count(),
    ]);

    return {
      success: true,
      message: 'Get all users successfully!',
      data,
      meta: {
        total,
        currentPage: page,
        lastPage: Math.ceil(total / limit),
        limit,
      },
    };
  }

  async findOne(id: number) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        isLocked: true,
        role: true,
        createdAt: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User is not exist!');
    }
    return {
      success: true,
      message: 'Get user by id success!',
      data: user,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { fullName, email, isLocked, password } = updateUserDto;
    let hashedPassword: string | undefined = undefined;
    if (password) {
      const saltOrRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltOrRounds);
    }
    const updateResult = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        fullName: fullName?.trim(),
        email: email?.trim(),
        isLocked,
        password: hashedPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        isLocked: true,
      },
    });
    return {
      success: true,
      message: 'Update successfully',
      data: updateResult,
    };
  }

  async remove(id: number) {
    const deleteResult = await this.prismaService.user.delete({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
      },
    });
    return {
      success: true,
      message: 'Delete successfully',
      data: deleteResult,
    };
  }
}
