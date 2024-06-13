import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, Tokens } from './auth.types';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/Local.guard';
import { RegisterUserDto } from './dto/RegisterUserDto';
import { Public } from 'src/Shared/Decorators/public.decorator';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from './guards/JWT.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => String, { description: 'Register a new user' })
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserDto,
  ): Promise<string> {
    await this.authService.localRegister(registerUserInput);
    return 'User registered Successfully';
  }

  @Mutation(() => Tokens, { nullable: true, description: 'Login a user' })
  @UseGuards(LocalAuthGuard)
  @Public()
  async login(
    @Args('loginUserInput') loginUserInput: LoginInput,
    @Context() context: any,
  ) {
    return await this.authService.login(context.user);
  }

  @Mutation(() => String, { description: 'Logout a user' })
  @UseGuards(JwtAuthGuard)
  async logout(@Context() context: any) {
    const user = context.req.user;
    await this.authService.logout(user.id);
    return 'Successfully logged out';
  }
}
