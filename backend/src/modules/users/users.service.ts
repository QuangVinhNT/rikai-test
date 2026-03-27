import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

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
      message: 'Get all user success!',
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
    const { fullName, email, isLocked } = updateUserDto;
    try {
      const updateResult = await this.prismaService.user.update({
        where: {
          id,
        },
        data: {
          fullName,
          email,
          isLocked,
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

  async remove(id: number) {
    try {
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
}
