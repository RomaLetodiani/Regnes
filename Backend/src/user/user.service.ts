import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/CreateUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserInput: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserInput);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(criteria: Partial<User>): Promise<User> {
    return await this.userRepository.findOne({ where: criteria });
  }
}
