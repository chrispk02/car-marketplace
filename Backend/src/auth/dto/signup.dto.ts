import { IsEmail, IsString, IsEnum, IsOptional } from 'class-validator';

enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
}

enum SellerType {
  USED = 'USED',
  NEW = 'NEW',
}

export class SignupDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsEnum(UserRole)
  role!: UserRole;

  @IsOptional()
  @IsEnum(SellerType)
  sellerType?: SellerType;
}
