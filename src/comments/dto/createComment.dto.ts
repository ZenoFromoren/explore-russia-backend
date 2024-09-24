import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/users/user.entity';

export class CreateCommentDTO {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  postId: number;
}