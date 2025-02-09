import { Module } from '@nestjs/common';

import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PostsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
