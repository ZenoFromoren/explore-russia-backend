import { IsString, IsUrl, Length, MinLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @IsString()
  @MinLength(1)
  city: string;

  @Column()
  @IsString()
  @Length(1, 70)
  title: string;

  @Column()
  @IsUrl()
  image: string;

  @Column()
  @IsString()
  text: string;
}
