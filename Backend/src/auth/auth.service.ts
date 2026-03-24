import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

const BCRYPT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<AuthResponseDto> {
    const existingUser = await this.prismaService.user.findUnique({
      where: { email: signupDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email đã được đăng ký');
    }

    const hashedPassword = await bcrypt.hash(signupDto.password, BCRYPT_ROUNDS);
    const user = await this.prismaService.user.create({
      data: {
        email: signupDto.email,
        password: hashedPassword,
        role: signupDto.role,
        sellerType: signupDto.role === 'SELLER' ? signupDto.sellerType : null,
      },
    });

    const token = this.jwtService.sign({ id: user.id, role: user.role });
    return {
      token,
      id: user.id,
      email: user.email,
      role: user.role as any,
    };
  }

  async signin(signinDto: SigninDto): Promise<AuthResponseDto> {
    const user = await this.prismaService.user.findUnique({
      where: { email: signinDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    const isPasswordValid = await bcrypt.compare(signinDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    const token = this.jwtService.sign({ id: user.id, role: user.role });

    return {
      token,
      id: user.id,
      email: user.email,
      role: user.role as any,
    };
  }
}