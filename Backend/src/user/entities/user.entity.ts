import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @Column({ unique: true })
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  //! I make auth reports in different table but for the sake of simplicity i will store it in the user table
  @Column({ default: 0 })
  @Field()
  signInCount: number;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

  //! Usually i make blacklists for tokens and cron job to clear expired ones from db but for the sake of simplicity i will just store the last token
  @Column({ nullable: true })
  @Field()
  refreshToken: string;
}
