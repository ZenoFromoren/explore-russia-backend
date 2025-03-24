import { JwtService } from '@nestjs/jwt';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { CreateUserDTO } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { MailerService } from '@nestjs-modules/mailer';
import { Request } from 'express';
import { Profile } from 'passport-yandex';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private mailerService: MailerService,
  ) {}

  async signup(createUserDTO: CreateUserDTO) {
    const user = await this.usersService.create(createUserDTO);
    return user;
  }

  async signupYandex(createUserDTO: { yandexId: string; username: string }) {
    const user = await this.usersService.createWithYandex(createUserDTO);
    return user;
  }

  async signin(user: User) {
    const { email, id: sub } = user;

    const accessToken = await this.jwtService.signAsync(
      { email, sub },
      { expiresIn: '7d' },
    );

    return {
      user,
      accessToken: `Bearer ${accessToken}`,
    };
  }

  async signinYandex(userData) {
    const yandexId = userData.yandexId;
    const user = userData.user;
    const accessToken = userData.accessToken;

    return {
      user,
      accessToken
    };
  }

  async signinGoogle(req: Request) {
    if (!req.user) {
      return 'No user from google';
    }

    return {
      message: 'User information from google',
      user: req.user,
    };
  }

  async validateUser(getEmail: string, getPassword: string) {
    const user = await this.usersService.findOne({
      where: { email: getEmail },
      select: {
        id: true,
        email: true,
        password: true,
        username: true,
        city: true,
        avatar: true,
        about: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Неверное имя пользователя или пароль');
    }

    const isMatched = await bcrypt.compare(getPassword, user.password);

    if (!isMatched) {
      throw new UnauthorizedException('Неверное имя пользователя или пароль');
    }

    const { password, ...userData } = user;

    return userData;
  }

  async refreshToken(user: User) {
    const { email, id: sub } = user;

    const accessToken = await this.jwtService.signAsync(
      { email, sub },
      { expiresIn: '30m' },
    );
    const refreshToken = await this.jwtService.signAsync(
      { email, sub },
      { expiresIn: '7d' },
    );

    return {
      user,
      accessToken: `Bearer ${accessToken}`,
      refreshToken,
    };
  }

  async sendCodeConfirmRegistration(createUserDTO: CreateUserDTO) {
    const { username, email } = createUserDTO;

    if (await this.usersService.checkUserExist(email)) {
      throw new ConflictException(
        'Данный адрес электронной почты уже зарегистрирован',
      );
    }

    const code = Math.floor(Math.random() * 9999)
      .toString()
      .padStart(4, '0');

    await this.mailerService.sendMail({
      to: email,
      subject: 'Подтверждение регистрации на explore-russia.ru',
      template: 'confirm-registration',
      context: {
        username,
        code,
      },
    });

    return { user: createUserDTO, code };
  }

  async sendCodeForgotPassword(user: User) {
    const { email, username } = user;

    const code = Math.floor(Math.random() * 9999)
      .toString()
      .padStart(4, '0');

    await this.mailerService.sendMail({
      to: email,
      subject: 'Сброс пароля на explore-russia.ru',
      template: 'forgot-password',
      context: {
        username,
        code,
      },
    });

    return { user, code };
  }

  async validateFromYandex(profile: Profile) {
    const email = JSON.stringify(profile.emails[0]['value']);
    console.log(`email validateFromYandex ${email}`);
    const user = await this.usersService.findByYandexId(email);

    const createUserDTO = {
      yandexId: email,
      username: JSON.stringify(profile.displayName),
    };

    if (!user) {
      return await this.usersService.createWithYandex(createUserDTO);
    }

    return user;
  }
}
