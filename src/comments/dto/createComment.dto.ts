import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDTO {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  postId: number;

  @IsNumber()
  @IsOptional()
  parentId: number;
}