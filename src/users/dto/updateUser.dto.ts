import {
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @Length(2, 30)
  @IsOptional()
  username: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  about: string;

  @IsUrl()
  @IsOptional()
  avatar: string;

  @IsString()
  @MinLength(8)
  @IsOptional()
  password: string;
}
