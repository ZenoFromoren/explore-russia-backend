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

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @TreeChildren()
  replies: Comment[];

  @TreeParent()
  parent: Comment;

//     @OneToMany(() => Comment, (comment) => comment.parent, {eager: true})
//     replies: Comment[];

//     @ManyToOne(() => Comment, (comment) => comment.replies)
//     parent: Comment;
}
