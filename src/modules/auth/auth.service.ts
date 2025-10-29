import {
  type IUserRepository,
  UserRepository,
} from './../../shared/repositories/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { AuthenticateDto } from './dto/authenticate.dto';
import { genSalt, hash } from 'bcrypt';
import { Forbidden, Unauthorized } from 'src/configurations/errors/errors';
import { ErrorsEnum } from 'src/configurations/errors/errors.enum';

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
}
