import { Controller, Get, Param, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<Post[]> {
    return await this.postsService.findAll();
  }

  @Get('last')
  async getLastPosts(): Promise<Post[]> {
    return await this.postsService.findMany({
      order: { createdAt: 'DESC' },
      take: 9,
    });
  }

  @Get('search')
  async searchPosts(@Query('query') query: string): Promise<Post[]> {
    return await this.postsService.searchPosts(query);
  }

  @Get(':postId')
  async getPostById(@Param('postId') postId: number): Promise<Post> {
    return await this.postsService.findById(postId, ['comments']);
  }
}
