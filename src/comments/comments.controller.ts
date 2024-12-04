import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/createComment.dto';
import { EditCommentDTO } from './dto/editComment.dto';
import { Comment } from './comment.entity';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private commmentsService: CommentsService) {}

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Comment> {
    return await this.commmentsService.findById(id);
  }

  @Get('replies/:id')
  async getReplies(@Param('id') id: number): Promise<Comment[]> {
    return await this.commmentsService.getReplies(id);
  }

  @Post('create')
  async create(@Body() createCommentDTO: CreateCommentDTO): Promise<Comment> {
    return await this.commmentsService.create(createCommentDTO);
  }

  @Post('reply')
  async reply(@Body() createCommentDTO: CreateCommentDTO): Promise<Comment> {
    return await this.commmentsService.reply(createCommentDTO);
  }

  @Patch('edit')
  async edit(@Req() req, @Body() editCommentDTO: EditCommentDTO): Promise<Comment> {
    await this.commmentsService.edit(editCommentDTO.id, req.user.id, editCommentDTO);

    return this.commmentsService.findById(editCommentDTO.id);
  }
}
