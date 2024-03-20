import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UpdateUserSettingDto } from 'src/users/dtos/UpdateUserSetting.dto';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserData: CreateUserDto) {
    return this.userService.createUser(createUserData);
  }

  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getOneUser(id);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateUser(
    @Body() updateUserData: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.userService.updateUser(id, updateUserData);
  }

  @Delete('/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Patch(':id/settings')
  updateUserSettingByUserId(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateUserSettingDto,
  ) {
    return this.userService.UpdateUserSetting(id, data);
  }

  @Get(':id/posts')
  fetchUserPosts(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserPosts(id);
  }
}
