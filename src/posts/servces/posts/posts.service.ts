import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  createPost(authorId: number, data: Prisma.PostCreateWithoutAuthorInput) {
    return this.prisma.post.create({
      data: {
        authorId,
        ...data,
      },
    });
  }

  getAllPosts() {
    return this.prisma.post.findMany();
  }

  async createGroupPosts(
    authorIds: number[],
    data: Prisma.GroupPostCreateWithoutAuthorsInput,
  ) {
    return await this.prisma.groupPost.create({
      data: {
        ...data,
        authors: {
          create: authorIds.map((id) => {
            return { authorId: id };
          }),
        },
      },
    });
  }

  async getAllGroupPosts() {
    return this.prisma.groupPost.findMany({
      include: { authors: { select: { author: true } } },
    });
  }
}
