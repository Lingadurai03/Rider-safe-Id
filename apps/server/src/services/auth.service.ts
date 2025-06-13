import {
    BadRequestException,
    Injectable, // Added for generic server errors
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'; // Import for Prisma specific errors
import * as bcrypt from 'bcrypt';

import { LoginDto, RegisterDto } from '@/dto';
import { PrismaService } from '@/services';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    // Register
    async register(userData: RegisterDto) {
        try {
            const existingUser = await this.prisma.user.findFirst({
                where: {
                    OR: [{ email: userData.email }],
                },
            });

            if (existingUser) {
                throw new BadRequestException('Email already exists');
            }

            const hashedPassword = await bcrypt.hash(userData.password, 10);

            const user = await this.prisma.user.create({
                data: {
                    ...userData,
                    password: hashedPassword,
                },
            });

            const tokens = await this.generateTokens(user);
            await this.updateRefreshToken(user.id, tokens.refreshToken);

            return {
                user: {
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                },
                ...tokens,
            };
        } catch (error) {
            throw error;
        }
    }

    // Login
    async login(loginData: LoginDto) {
        const { email, password } = loginData;
        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    OR: [{ email: email }],
                },
            });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new UnauthorizedException('Invalid credentials');
            }

            const tokens = await this.generateTokens(user);
            await this.updateRefreshToken(user.id, tokens.refreshToken);

            return {
                user: {
                    id: user.id,
                    email: user.email,
                    fullName: user.fullName,
                    role: user.role,
                },
                ...tokens,
            };
        } catch (error) {
            throw error;
        }
    }

    async generateTokens(user: { email: string; id: string }) {
        const payload = { email: user.email, sub: user.id };

        const accessToken = this.jwtService.sign(payload);

        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.REFRESH_TOKEN_SECRET!,
            expiresIn: '7d',
        });

        return { accessToken, refreshToken };
    }

    async updateRefreshToken(userId: string, refreshToken: string | null) {
        try {
            const hashed = refreshToken
                ? await bcrypt.hash(refreshToken, 10)
                : null;

            return await this.prisma.user.update({
                where: { id: userId },
                data: { refreshToken: hashed },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                throw new BadRequestException(
                    `User with ID ${userId} not found.`,
                );
            }
        }
    }
}
