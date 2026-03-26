import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

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
      data,
      meta: {
        total,
        currentPage: page,
        lastPage: Math.ceil(total / limit),
        limit,
      },
    };
  }
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
