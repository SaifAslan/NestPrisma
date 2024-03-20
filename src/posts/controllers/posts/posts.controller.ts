import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateGroupPostDto } from 'src/posts/dtos/CreateGroupPosts.dto';
import { CreatePostDto } from 'src/posts/dtos/CreatePostDto.dto';
import { PostsService } from 'src/posts/servces/posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @Post()
  @UsePipes(ValidationPipe)
  createPost(@Body() { authorId, ...createPostData }: CreatePostDto) {
    return this.postsService.createPost(authorId, createPostData);
  }

  @Get()
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Post('group')
  @UsePipes(ValidationPipe)
  createGroupPost(@Body() { authorId, ...data }: CreateGroupPostDto) {
    return this.postsService.createGroupPosts(authorId, data);
  }

  @Get('group')
  getALLGroupPosts() {
    return this.postsService.getAllGroupPosts()
  }
}
