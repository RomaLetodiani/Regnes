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

  @Mutation(() => Tokens)
  @Public()
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserDto,
  ) {
    return await this.authService.localRegister(registerUserInput);
  }

  @Mutation(() => Tokens, { nullable: true })
  @UseGuards(LocalAuthGuard)
  @Public()
  async login(
    @Args('loginUserInput') loginUserInput: LoginInput,
    @Context() context: any,
  ) {
    return await this.authService.createTokens(context.user);
  }

  @Mutation(() => User, { nullable: true })
  @UseGuards(JwtAuthGuard)
  @Public()
  async logout() {
    return await this.authService.logout(undefined);
  }
}
