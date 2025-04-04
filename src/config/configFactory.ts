import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Comment } from 'src/comments/comment.entity';
import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class ConfigFactory implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.name'),
      schema: this.configService.get<string>('database.schema'),
      entities: [Post, User, Comment],
      // migrations: [`${__dirname}/**/database/migrations/**/*{.ts,.js}`],
      // migrationsTableName:'migrationsTable',
      // migrationsRun: true,
      synchronize: true,
    };
  }
}
