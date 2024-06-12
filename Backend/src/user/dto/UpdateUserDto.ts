import { IsNotEmpty, IsString } from 'class-validator';
import { hash } from 'bcryptjs';
import { BeforeInsert } from 'typeorm';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Field username must be added' })
  username: string;

  @IsNotEmpty({ message: 'Field description must be added' })
  @IsString()
  password: string;

  @BeforeInsert() // Hash password before saving
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
