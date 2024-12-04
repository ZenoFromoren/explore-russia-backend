import { defaultAbout } from '../constants';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';
import { Comment } from 'src/comments/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @IsString()
  @Length(2, 30)
  username: string;

  @Column({ default: 'Город не указан' })
  @IsString()
  city: string;

  @Column({ default: defaultAbout, nullable: true })
  @IsString()
  about: string;

  @Column({
    default: '../../../explore-russia-frontend/src/images/defaultAvatar.png',
  })
  @IsUrl()
  avatar: string;

  @Column({ unique: true, default: null, nullable: true })
  @IsEmail()
  email: string;

  @Column({ select: false, default: null, nullable: true })
  @IsString()
  @MinLength(2)
  password: string;

  @Column({ default: null, nullable: true })
  @IsString()
  googleId: string;

  @Column({ default: null, nullable: true })
  @IsString()
  yandexId: string;

  @OneToMany(() => Comment, (comment) => comment.owner)
  comments: Comment[];
}
