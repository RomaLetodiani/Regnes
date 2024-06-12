import { IsNotEmpty, IsString } from 'class-validator';
import { hash } from 'bcryptjs';
import { BeforeInsert } from 'typeorm';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RegisterUserDto {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Field username must be added' })
  username: string;

  @Field()
  @IsNotEmpty({ message: 'Field description must be added' })
  @IsString()
  password: string;

  @BeforeInsert() // Hash password before saving
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
