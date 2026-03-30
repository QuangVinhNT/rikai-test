import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CloudinaryService } from '@/common/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import 'multer';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  @UseInterceptors(FileInterceptor('images'))
  @Post()
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    const result = await this.cloudinaryService.uploadFile(file);
    const imageUrl = result.secure_url;
    const categoryId = Number(createProductDto.categoryId);
    const price = Number(createProductDto.price);
    return this.productsService.create({
      ...createProductDto,
      categoryId,
      price,
      images: [imageUrl],
    });
  }

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.productsService.findAll(
      page,
      limit,
      search,
      categoryId ? +categoryId : undefined,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Put(':id')
  @UseInterceptors(FileInterceptor('images'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let images = updateProductDto.images;

    if (file) {
      const result = await this.cloudinaryService.uploadFile(file);
      images = [result.secure_url];
    }

    const categoryId = updateProductDto.categoryId
      ? Number(updateProductDto.categoryId)
      : undefined;
    const price = updateProductDto.price
      ? Number(updateProductDto.price)
      : undefined;
    const quantity = updateProductDto.quantity
      ? Number(updateProductDto.quantity)
      : undefined;

    return this.productsService.update(id, {
      ...updateProductDto,
      images,
      categoryId,
      price,
      quantity,
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
