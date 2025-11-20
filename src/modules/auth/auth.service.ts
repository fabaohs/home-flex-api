import {
  type IUserRepository,
  UserRepository,
} from './../../shared/repositories/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { AuthenticateDto, RegisterDto } from './dto/authenticate.dto';
import { genSalt, hash } from 'bcrypt';
import {
  Conflict,
  Forbidden,
  Unauthorized,
} from 'src/configurations/errors/errors';
import { ErrorsEnum } from 'src/configurations/errors/errors.enum';
import { JwtUtils } from 'src/shared/utils/jwt.utils';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepository) private userRepository: IUserRepository,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async authenticate(authenticateDto: AuthenticateDto) {
    const { email, password } = authenticateDto;
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new Forbidden(ErrorsEnum.USER_NOT_FOUND);
    }

    const hashedPwd = await this.hashPassword(password);

    if (user.password !== hashedPwd) {
      throw new Unauthorized(ErrorsEnum.INVALID_CREDENTIALS);
    }

    return user;
  }

  async register(registerDto: RegisterDto) {
    const { email, password, name, enterpriseId, profileEnum } = registerDto;

    const existingUser = await this.userRepository.getByEmail(email);

    if (existingUser) {
      throw new Conflict(ErrorsEnum.EMAIL_ALREADY_EXISTS);
    }

    const hashedPwd = await this.hashPassword(password);

    const user = await this.userRepository.create({
      email,
      password: hashedPwd,
      name,
      enterpriseId,
      profileEnum,
    });

    const token = JwtUtils.createToken({
      id: user.id,
      email: user.email,
      enterpriseId,
      name: user.name,
      profile: profileEnum,
    });

    const refreshToken = JwtUtils.createToken(
      {
        id: user.id,
        email: user.email,
        enterpriseId,
        name: user.name,
        profile: profileEnum,
      },
      '7d',
    );

    return { token, refreshToken, ...user };
  }
}
