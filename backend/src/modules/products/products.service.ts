import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const {
      productName,
      description,
      price,
      categoryId,
      images,
      specifications,
    } = createProductDto;
    const productExist = await this.prismaService.product.findFirst({
      where: {
        productName: productName.trim(),
      },
    });
    if (productExist) {
      throw new ConflictException('Product name is exist!');
    }
    const newProduct = await this.prismaService.product.create({
      data: {
        productName: productName.trim(),
        description: description.trim(),
        price,
        quantity: 0,
        categoryId,
        specifications,
        images,
      },
    });
    return {
      success: true,
      message: 'Create product successfully',
      data: newProduct,
    };
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prismaService.product.findMany({
        skip,
        take: limit,
        orderBy: [{ productName: 'asc' }, { createdAt: 'desc' }],
        include: {
          category: {
            select: {
              categoryName: true,
            },
          },
        },
      }),
      this.prismaService.product.count(),
    ]);
    return {
      success: true,
      message: 'Get all products successfully!',
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
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
    if (!product) {
      throw new NotFoundException('Product is not exist!');
    }
    return {
      success: true,
      message: 'Get product by id success!',
      data: product,
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { productName, description, price, quantity, categoryId } =
      updateProductDto;
    const updateResult = await this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        productName: productName?.trim(),
        description: description?.trim(),
        price,
        quantity,
        categoryId,
      },
    });
    return {
      success: true,
      message: 'Update successfully',
      data: updateResult,
    };
  }

  async remove(id: number) {
    const deleteResult = await this.prismaService.product.delete({
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
