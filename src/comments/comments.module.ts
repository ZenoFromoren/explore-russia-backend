import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { UsersModule } from 'src/users/users.module';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { JwtAuthGuard } from 'src/auth/guards/jwtAuth.guard';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UsersModule, PostsModule],
  providers: [CommentsService, JwtAuthGuard],
  controllers: [CommentsController],
  exports: [CommentsService]
})
export class CommentsModule {}
