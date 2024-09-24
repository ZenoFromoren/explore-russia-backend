import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/createComment.dto';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private commmentsService: CommentsService) {}

  @Post('create')
  async create(@Body() createCommentDTO: CreateCommentDTO) {
    return await this.commmentsService.create(createCommentDTO);
  }
}
