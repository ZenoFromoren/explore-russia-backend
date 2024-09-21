import { IsString } from 'class-validator';

export class SigninUserResponseDTO {
  @IsString()
  accessToken: string;
}
