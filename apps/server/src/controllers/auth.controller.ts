import { Body, Controller, Post } from '@nestjs/common';

import { LoginDto, RegisterDto } from '@/dto';
import { AuthService } from '@/services';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() registerData: RegisterDto) {
        return this.authService.register(registerData);
    }

    @Post('login')
    login(@Body() loginData: LoginDto) {
        return this.authService.login(loginData);
    }
}
