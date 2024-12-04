import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-yandex';
import { AuthService } from '../auth.service';
import { Response } from 'express';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy) {
  // public name = 'yandex';

  // public oauthURL = new URL(
  //   'https://oauth.yandex.ru/authorize?response_type=code',
  // );
  // public tokenURL = new URL('https://oauth.yandex.ru/token');
  // public profileURL = new URL('https://login.yandex.ru/info?format=json');
  // public authorizationURL = new URL('http://localhost:5173/login')

  // public clientID: string;
  // public clientSecret: string;
  // public callbackURL: string;

  constructor(private authService: AuthService) {
    super({
      clientID: process.env.YANDEX_CLIENT_ID,
      clientSecret: process.env.YANDEX_CLIENT_SECRET,
      callbackURL: process.env.YANDEX_REDIRECT_URI,
    });

    // this.oauthURL.searchParams.append('client_id', this.clientID);

    // if (this.callbackURL) {
    //   this.oauthURL.searchParams.append('redirect_uri', this.callbackURL);
    // }
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(`profile ${JSON.stringify(profile)}`);
    const user = await this.authService.validateFromYandex(profile);

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      user,
      accessToken,
    };
  }
}
