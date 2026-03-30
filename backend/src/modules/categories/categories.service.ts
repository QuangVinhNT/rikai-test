import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { categoryName } = createCategoryDto;
    const categoryExist = await this.prismaService.category.findFirst({
      where: {
        categoryName: categoryName.trim(),
      },
    });
    if (categoryExist) {
      throw new ConflictException('Category name is exist!');
    }
    const newCategory = await this.prismaService.category.create({
      data: {
        categoryName: categoryName.trim(),
        specificationsKey: createCategoryDto.specificationsKey || [],
      },
    });
    return {
      success: true,
      message: 'Create category successfully!',
      data: newCategory,
    };
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prismaService.category.findMany({
        skip,
        take: limit,
        orderBy: [{ categoryName: 'asc' }],
      }),
      this.prismaService.category.count(),
    ]);

    return {
      success: true,
      message: 'Get all categories successfully!',
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
    const category = await this.prismaService.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return {
      success: true,
      message: 'Get category successfully!',
      data: category,
    };
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const { categoryName, specificationsKey } = updateCategoryDto;
    const updateResult = await this.prismaService.category.update({
      where: {
        id,
      },
      data: {
        ...(categoryName && { categoryName: categoryName.trim() }),
        ...(specificationsKey && { specificationsKey }),
      },
    });
    return {
      success: true,
      message: 'Update successfully',
      data: updateResult,
    };
  }

  async remove(id: number) {
    const deleteResult = await this.prismaService.category.delete({
      where: {
        id,
      },
    });
    return {
      success: true,
      message: 'Delete successfully',
      data: deleteResult,
    };
  }
}
