import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AllUsersData {
  @Field()
  username: string;
}
