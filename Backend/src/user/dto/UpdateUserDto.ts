import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { hash } from 'bcryptjs';
import { BeforeInsert } from 'typeorm';

export class UpdateUserDto {
  @IsString()
  username?: string;

  @IsString()
  password?: string;

  @IsNumber()
  signInCount?: number;
}
