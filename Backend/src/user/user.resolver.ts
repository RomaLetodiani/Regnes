import { Resolver, Query, Context, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/JWT.guard';
import { UpdateUserDto } from './dto/UpdateUserDto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => User, {
    name: 'CurrentUser',
    description: 'Get Current User (Authorization Required)',
  })
  async findOne(@Context() context: any) {
    const user = context.req.user;
    return await this.userService.findOne({ id: user.id });
  }

  @Mutation(() => User, {
    name: 'UpdateUser',
    description: 'Update User (Authorization Required)',
  })
  @UseGuards(JwtAuthGuard)
  async update(
    @Context() context: any,
    @Args('updateUserInput') updateUserInput: UpdateUserDto,
  ) {
    const user = context.req.user;
    return await this.userService.update(user.id, updateUserInput);
  }
}
