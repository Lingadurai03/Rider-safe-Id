import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
    GetRoleApiResponse,
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

        try {
                const qrResponse = await fetch(
                `${process.env.QR_SERVICE_BASE_URL}qr/generate/${user.id}`,
                {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json', 
                        'x-api-key': process.env.INTERNAL_API_KEY as string,
                    },
                }
            );

            if (!qrResponse.ok) {
                // Rollback user creation if QR generation failed
                await this.prisma.user.delete({
                    where: { id: user.id },
                });
                throw new Error('QR Generation failed. User creation rolled back.');
            }

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
            console.error('Error during QR generation or token creation:', error);
            throw error;
        }

        } catch (error) {
            console.error('Error during registration:', error);
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

    async getRole(userId: string): Promise<GetRoleApiResponse> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                select: { role: true },
            });

            if (!user) {
                throw new NotFoundException('User not found');
            }

            return { role: user.role };
        } catch (_error) {
            throw new InternalServerErrorException('Failed to fetch user role');
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

    async updateUserLastSeenNotificationAt(userId: string) {
        return await this.prisma.user.update({
            where: { id: userId },
            data: { lastSeenNotificationAt: new Date() },
        });
    }

    async getUserInfo(userId: string) {
        return await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                lastSeenNotificationAt: true,
                role: true,
            },
        });
    }

    async logout(userId: string) {
        await this.updateRefreshToken(userId, null);
        return { message: 'Logged out' };
    }
}
