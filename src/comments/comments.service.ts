import { CreateCommentDTO } from './dto/createComment.dto';
import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';
import { EditCommentDTO } from './dto/editComment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    @Inject(forwardRef(() => PostsService))
    private postsService: PostsService,
    private dataSource: DataSource,
  ) {}

  async findOne(query: FindOneOptions): Promise<Comment> {
    const comment = await this.commentsRepository.findOne(query);

    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }

    return comment;
  }

  async findById(id: number): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({ where: { id } });

    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }

    return comment;
  }

  async getReplies(id: number): Promise<Comment[]> {
    const parent = await this.commentsRepository.findOne({ where: { id } });

    if (!parent) {
      throw new NotFoundException('Комментарий не найден');
    }

    const replies = (await this.dataSource.manager
      .getTreeRepository(Comment)
      .findDescendants(parent)).filter((reply) => reply.id !== id);

    return replies;
  }

  async create(createCommentDTO: CreateCommentDTO): Promise<Comment> {
    const { text, userId, postId } = createCommentDTO;

    const owner = await this.usersService.findUserById(userId);
    const post = await this.postsService.findById(postId);

    const newComment = this.commentsRepository.create({ text, owner, post });

    return await this.commentsRepository.save(newComment);
  }

  async reply(createCommentDTO: CreateCommentDTO): Promise<Comment> {
    const { text, userId, postId, parentId } = createCommentDTO;

    const comment = new Comment();

    const owner = await this.usersService.findUserById(userId);
    const post = await this.postsService.findById(postId);
    const parent = await this.findById(parentId);

    comment.text = text;
    comment.post = post;
    comment.owner = owner;
    comment.parent = parent;

    await this.dataSource.manager.save(comment);

    return comment;
  }

  async edit(
    commentId: number,
    userId: number,
    editCommentDTO: EditCommentDTO,
  ) {
    const comment = this.findById(commentId);

    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }

    if (userId !== (await comment).owner.id) {
      throw new ForbiddenException('Нельзя редактировать чужие комментарии');
    }

    return await this.commentsRepository.update(commentId, editCommentDTO);
  }
}
