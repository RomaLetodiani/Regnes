import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  username?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  password?: string;

  @IsNumber()
  @IsOptional()
  signInCount?: number;
}
