import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/UpdateUserDto';

type CreateUserArgs = {
  username: string;
  password: string;
};

type UpdateRefreshTokenArgs = {
  id: number;
  refreshToken?: string;
};

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserInput: CreateUserArgs): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username: createUserInput.username },
    });

    if (user) {
      throw new BadRequestException('User with this username already exists');
    }

    return await this.userRepository.save(createUserInput);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(criteria: Partial<User>): Promise<User> {
    //! Default should be 0 or we should throw the error if id is undefined or null because of the bug in typeorm
    //! Bug: Returns first record if id is undefined or null
    //! Issue: https://github.com/typeorm/typeorm/issues/9316
    //! PR: https://github.com/BetterLeap/typeorm/pull/1
    const user = await this.userRepository.findOneBy({
      ...criteria,
      id: criteria.id ? criteria.id : 0,
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async update(userId: number, body: UpdateUserDto) {
    const user = await this.findOne({ id: userId });

    const updatedUser = {
      ...user,
      ...body,
    };

    await this.userRepository.update(userId, updatedUser);

    return updatedUser;
  }

  async updateRefreshToken(data: UpdateRefreshTokenArgs) {
    const { id, refreshToken = null } = data;

    const user = await this.findOne({
      id,
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    user.refreshToken = refreshToken;
    await this.userRepository.save(user);

    return user;
  }
}
