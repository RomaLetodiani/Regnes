import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'AllUsers', nullable: true })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Query(() => User, { name: 'userById', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne({ id });
  }
}
