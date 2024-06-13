import { Resolver, Query, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/JWT.guard';
import { AllUsersData } from './dto/AllUsers.inputType';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [AllUsersData], {
    name: 'AllUsers',
    description: 'Get all users',
  })
  async findAll() {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'CurrentUser', description: 'Get Current User' })
  async findOne(@Context() context: any) {
    const user = context.req.user;
    return await this.userService.findOne({ id: user.id });
  }
}
