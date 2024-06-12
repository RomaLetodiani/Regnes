import { Field, InputType, ObjectType } from '@nestjs/graphql';

export type JwtUserPayload = {
  id: number;
  username: string;
};
@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class Tokens {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
