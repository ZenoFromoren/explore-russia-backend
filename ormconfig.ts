import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.PORT),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  schema: process.env.POSTGRES_DB_SCHEMA,
  entities: [Post, User],
  migrations: [`${__dirname}/**/database/migrations/**/*{.ts,.js}`],
  migrationsTableName:'migrationsTable',
  migrationsRun: true,
  synchronize: false,
});
