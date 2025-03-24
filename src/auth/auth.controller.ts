import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/localAuth.guard';
import { CreateUserDTO } from 'src/users/dto/createUser.dto';
import { SigninUserResponseDTO } from './dto/signinUserResponse.dto';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { GoogleAuthGuard } from './guards/googleAuth.guard';
import { YandexAuthGuard } from './guards/yandexAuth.guard';

@Controller('')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Req() req): Promise<SigninUserResponseDTO> {
    return await this.authService.signin(req.user);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('signinGoogle')
  async signinGoogle(@Req() req) {}

  @UseGuards(GoogleAuthGuard)
  @Get('signinGoogle/redirect')
  googleAuthRedirect(@Req() req) {
    return this.authService.signinGoogle(req);
  }

  @UseGuards(YandexAuthGuard)
  @Get('yandex')
  yandex() {}

  @UseGuards(YandexAuthGuard)
  @Get('yandex/callback')
  async yandexCallback(@Req() req) {
    return req.user;
  }

  @Post('signup')
  async signup(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.authService.signup(createUserDTO);
    return await this.authService.signin(user);
  }

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
