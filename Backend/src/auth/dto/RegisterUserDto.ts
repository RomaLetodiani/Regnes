import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterUserDto {
  @Field()
  @IsString()
  @IsNotEmpty({
    message: 'Username must be added',
  })
  @Length(4, 20, { message: 'Username must be between 4 and 20 characters' })
  username: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Password must be added' })
  @Length(4, 20, { message: 'Password must be between 4 and 20 characters' })
  password: string;
}
