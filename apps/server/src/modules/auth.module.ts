import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '@/controllers';
import { AuthService } from '@/services';
import { JwtStrategy } from '@/strategy';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.ACCESS_TOKEN_SECRET!,
            signOptions: { expiresIn: '1h' },
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtModule, PassportModule],
})
export class AuthModule {}
