import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserSettings } from './UserSettings';

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  settings?: UserSettings;
}
