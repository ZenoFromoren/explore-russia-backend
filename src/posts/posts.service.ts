import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async findOne(query: FindOneOptions): Promise<Post> {
    const post = await this.postsRepository.findOne(query);

    if (!post) {
      throw new NotFoundException('Пост не найден');
    }

    return post;
  }

  async findMany(query: FindManyOptions): Promise<Post[]> {
    const posts = await this.postsRepository.find(query);

    if (!posts) {
      throw new NotFoundException('Посты не найдены');
    }

    return posts;
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postsRepository.find({});

    if (!posts) {
      throw new NotFoundException('Посты не найдены');
    }

    return posts;
  }

  async findById(id: number, relations = null): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations,
    });

    if (!post) {
      throw new NotFoundException('Пост не найден');
    }

    return post;
  }

  async searchPosts(query: string): Promise<Post[]> {
    const queryLowerCase = query.toLowerCase();
    const posts = (await this.findAll()).filter(
      (post) =>
        post.city.toLowerCase().includes(queryLowerCase) ||
        post.title.toLowerCase().includes(queryLowerCase) ||
        post.text.toLowerCase().includes(queryLowerCase),
    );

    return posts;
  }
}
