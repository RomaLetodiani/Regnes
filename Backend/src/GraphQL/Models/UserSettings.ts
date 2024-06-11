import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserSettings {
  @Field((type) => Int)
  id: number;

  @Field((type) => Int)
  userId: number;

  @Field((type) => Int)
  theme: 0 | 1; // 0 = Light, 1 = Dark

  @Field()
  receiveNotifications: boolean;
}
