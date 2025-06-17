import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import {
    LoginApiResponse,
    RefreshTokenApiResponse,
    RegisterApiResponse,
} from '@ridersafeid/types';

import { LoginDto, RegisterDto } from '@/dto';
import { RefreshTokenDto } from '@/dto';
import { JwtAuthGuard } from '@/guards';
import { AuthService } from '@/services';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() registerData: RegisterDto): Promise<RegisterApiResponse> {
        return this.authService.register(registerData);
    }

    @Post('login')
    login(@Body() loginData: LoginDto): Promise<LoginApiResponse> {
        return this.authService.login(loginData);
    }
    @Post('refresh')
    async refresh(
        @Body() body: RefreshTokenDto,
    ): Promise<RefreshTokenApiResponse> {
        return this.authService.refreshToken(body);
    }
    @UseGuards(JwtAuthGuard)
    @Get('getRole')
    async getRole(@Request() req: { user: { id: string } }) {
        return this.authService.getRole(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Request() req: { user: { id: string } }) {
        return this.authService.logout(req.user.id);
    }
}
