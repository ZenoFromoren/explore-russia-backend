import { IsNotEmpty, IsString } from 'class-validator';
import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ManyToOne(() => User, (user) => user.comments, {
    eager: true,
  })
  owner: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @OneToMany(() => Comment, (comment) => comment.replies)
  replies: Comment[];
}
