import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '@/controllers';
import { AuthModule, PublicModule } from '@/modules';
import { AppService } from '@/services';

import { ProfileModule } from './profile.module';
import { UploadModule } from './upload.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Make the config available throughout the app,
            envFilePath:
                process.env.NODE_ENV === 'production' ? undefined : ['.env'],
        }),
        AuthModule,
        ProfileModule,
        PublicModule,
        UploadModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
