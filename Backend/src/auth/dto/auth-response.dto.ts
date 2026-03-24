import { IsString, IsEmail, IsEnum } from 'class-validator';

enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN',
}

export class AuthResponseDto {
  @IsString()
  token: string;

  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  role: UserRole;
}
