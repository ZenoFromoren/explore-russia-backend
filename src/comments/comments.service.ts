import { CreateCommentDTO } from './dto/createComment.dto';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    @Inject(forwardRef(() => PostsService))
    private postsService: PostsService,
  ) {}

  async create(createCommentDTO: CreateCommentDTO): Promise<Comment> {
    const { text, userId, postId } = createCommentDTO;

    const owner = await this.usersService.findUserById(userId);
    const post = await this.postsService.findById(postId);

    const newComment = this.commentsRepository.create({ text, owner, post });

    return await this.commentsRepository.save(newComment);
  }
}
