import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { CreateUserDTO } from 'src/users/dto/createUser.dto';
import { SigninUserResponseDTO } from './dto/signinUserResponse.dto';
import { JwtAuthGuard } from './guards/jwtAuth.guard';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Req() req): Promise<SigninUserResponseDTO> {
    return await this.authService.signin(req.user);
  }

  @Post('signup')
  async signup(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.authService.signup(createUserDTO);

    return await this.authService.signin(user);
  }

  // @Post('refreshtoken')
  // async refreshToken(@Req() req) {
  //   return await this.authService.refreshToken(req.user);
  // }

  @Post('confirm-registration')
  async sendCodeConfirmRegistration(@Body() createUserDTO: CreateUserDTO) {
    const userData =
      await this.authService.sendCodeConfirmRegistration(createUserDTO);
    return userData;
  }

  @UseGuards(JwtAuthGuard)
  @Post('forgot-password')
  async sendCodeForgotPassword(@Req() req) {
    const userData = await this.authService.sendCodeForgotPassword(req.user);
    return userData;
  }
}
