import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @Length(2, 30)
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsOptional()
  about: string;

  @IsUrl()
  @IsOptional()
  avatar: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  password: string;
}
