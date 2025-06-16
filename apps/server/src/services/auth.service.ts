import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
    LoginApiPayload,
    RefreshTokenApiPayload,
    RegisterApiPayload,
} from '@ridersafeid/types';
import * as bcrypt from 'bcrypt';

import { Role } from '@/constant';
import { PrismaService } from '@/services';
import { JwtPayload } from '@/types';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    // Register
    async register(userData: RegisterApiPayload) {
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
    async login(loginData: LoginApiPayload) {
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

    async generateTokens(user: { email: string; id: string; role: string }) {
        const payload: JwtPayload = {
            email: user.email,
            sub: user.id,
            role: user.role == Role.ADMIN ? Role.ADMIN : Role.USER,
        };

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

    async refreshToken(body: RefreshTokenApiPayload) {
        const { refreshToken } = body;
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: process.env.REFRESH_TOKEN_SECRET!,
            });

            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
            });

            if (!user || !user.refreshToken) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const isMatch = await bcrypt.compare(
                refreshToken,
                user.refreshToken,
            );
            if (!isMatch)
                throw new UnauthorizedException('Invalid refresh token');

            const tokens = await this.generateTokens(user);
            await this.updateRefreshToken(user.id, tokens.refreshToken);

            return tokens;
        } catch (_err) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async logout(userId: string) {
        await this.updateRefreshToken(userId, null);
        return { message: 'Logged out' };
    }
}
