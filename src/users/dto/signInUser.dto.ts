import { IsEmail, IsString } from 'class-validator';

export class SignInUserDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
