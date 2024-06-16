import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { jwtConstants } from './auth.constants';
import { JwtUserPayload } from './auth.types';
import { JwtPayload } from 'jsonwebtoken';
import { UpdateTokensDto } from './dto/UpdateTokens.dto';
import { RegisterUserDto } from './dto/RegisterUserDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string) {
    return await hash(password, 10);
  }

  async comparePassword(inputPassword: string, userPassword: string) {
    return await compare(inputPassword, userPassword);
  }

  async validateUser(username: string, password: string): Promise<any> {
    let user: User;

    try {
      user = await this.usersService.findOne({ username });
    } catch {
      throw new BadRequestException('Invalid credentials');
    }

    const passwordEqual = await this.comparePassword(password, user.password);

    if (passwordEqual) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async createTokens(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
    };

    const tokens = {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: '4w',
        secret: jwtConstants.refreshTokenSecret,
      }),
    };

    await this.usersService.updateRefreshToken({
      id: user.id,
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }

  async updateTokens(data: UpdateTokensDto) {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    let decodedToken: JwtPayload & JwtUserPayload;

    try {
      decodedToken = this.jwtService.verify(data.refreshToken, {
        secret: jwtConstants.refreshTokenSecret,
      });
    } catch {
      throw new BadRequestException('Invalid refreshToken');
    }

    if (!decodedToken.id || decodedToken.exp < currentTimestamp) {
      throw new BadRequestException('Invalid refreshToken');
    }

    const user = await this.usersService.findOne({ id: decodedToken.id });

    if (user.refreshToken === data.refreshToken) {
      return this.createTokens(user);
    } else {
      throw new BadRequestException('Invalid refreshToken');
    }
  }

  async login(user: User) {
    return await this.createTokens(user);
  }

  async localRegister(data: RegisterUserDto) {
    const { username, password } = data;

    const hashedPassword = await this.hashPassword(password);

    const user = await this.usersService.create({
      username,
      password: hashedPassword,
    });

    if (!user) {
      throw new BadRequestException('Error creating user');
    }
  }

  async logout(id: number) {
    return await this.usersService.updateRefreshToken({
      id,
      refreshToken: null,
    });
  }
}
