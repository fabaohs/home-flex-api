import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthenticateDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email do usuário',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'P@ssw0rd!',
    description: 'Senha do usuário',
    minLength: 6,
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
