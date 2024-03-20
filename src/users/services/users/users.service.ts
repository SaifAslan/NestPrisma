import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...data,
        userSetting: {
          create: {
            notifiacationOn: false,
            smsEnabled: true,
          },
        },
      },
    });
  }

  getAllUsers() {
    return this.prisma.user.findMany({ include: { userSetting: true } });
  }

  async getOneUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        userSetting: {
          select: {
            smsEnabled: true,
            notifiacationOn: true,
          },
        },
      },
    });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    if (data.username) {
      const userInDB = await this.prisma.user.findUnique({
        where: { username: data.username as string },
      });
      if (userInDB) {
        throw new HttpException(
          'Username is take! Please try again!',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    return await this.prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return this.prisma.user.delete({ where: { id } });
  }

  async UpdateUserSetting(id: number, data: Prisma.UserSettingUpdateInput) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { userSetting: true },
    });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    if (!user.userSetting)
      throw new HttpException('user settings not found', HttpStatus.NOT_FOUND);
    return this.prisma.userSetting.update({ where: { userId: id }, data });
  }

  async getUserPosts(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
    if (!user) throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    return user;
  }
}
