import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { type ProfileEnum, users } from 'src/shared/tables';

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

export class RegisterDto extends AuthenticateDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nome completo do usuário',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'ID da empresa do usuário',
  })
  @IsNotEmpty()
  enterpriseId: number;

  @ApiProperty({
    example: 'USER',
    description: 'Perfil do usuário',
  })
  @IsNotEmpty()
  profileEnum: ProfileEnum;
}
