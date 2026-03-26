import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return this.usersService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/lock')
  lock(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.update(id, { isLocked: true });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/unlock')
  unlock(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.update(id, { isLocked: false });
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
