import { IsNotEmpty, IsString } from 'class-validator';
import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Tree('closure-table')
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

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(() => User, (user) => user.comments, {
    eager: true,
  })
  owner: User;

  @Column()
  post: number;

  @TreeChildren()
  replies: Comment[];

  @TreeParent()
  parent: Comment;
}
