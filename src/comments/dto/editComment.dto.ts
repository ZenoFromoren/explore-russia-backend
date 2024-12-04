import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EditCommentDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  text: string;
}