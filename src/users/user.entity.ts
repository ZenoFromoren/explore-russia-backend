import { defaultAbout } from '../constants';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { IsEmail, IsString, IsUrl, Length, MinLength } from 'class-validator';
import { Comment } from 'src/comments/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  @IsString()
  @Length(2, 30)
  username: string;

  @Column()
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

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ select: false })
  @IsString()
  @MinLength(2)
  password: string;

  @OneToMany(() => Comment, (comment) => comment.owner)
  comments: Comment[];
}
