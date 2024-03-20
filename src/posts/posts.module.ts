import { Module } from '@nestjs/common';
import { PostsService } from './servces/posts/posts.service';
import { PostsController } from './controllers/posts/posts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {
  
}
