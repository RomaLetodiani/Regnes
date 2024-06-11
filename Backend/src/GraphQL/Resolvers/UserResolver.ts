import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../Models/User';
import { users } from 'src/DummyData/Users';
import { UserSettings } from '../Models/UserSettings';
import { userSettings } from 'src/DummyData/UserSettings';

@Resolver((of) => User)
export class UserResolver {
  @Query((returns) => [User])
  getUsers() {
    return users;
  }

  @Query((returns) => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return users.find((user) => user.id === id);
  }

  @Query((returns) => User, { nullable: true })
  getUserByUsername(@Args('username') username: string) {
    return users.find((user) => user.username === username);
  }

  @ResolveField((returns) => UserSettings, { nullable: true, name: 'settings' })
  getUserSettings(@Parent() user: User) {
    return userSettings.find((settings) => settings.userId === user.id);
  }

  @Mutation((returns) => User)
  createUser(
    @Args('username') username: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const user: User = {
      id: users.length + 1,
      username,
      email,
      password,
    };

    users.push(user);

    return user;
  }
}
