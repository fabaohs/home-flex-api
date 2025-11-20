import jwt from 'jsonwebtoken';

import { LoggedUserDto } from '../dtos/user.dtos';

function createToken(claims: LoggedUserDto, expiresIn: any = '1h'): string {
  const key = process.env.JWT_SECRET as string;

  return jwt.sign(claims, key, { expiresIn });
}

function validateToken(token: string): LoggedUserDto {
  const key = process.env.JWT_SECRET as string;
  return jwt.verify(token, key) as LoggedUserDto;
}

export const JwtUtils = {
  createToken,
  validateToken,
};
