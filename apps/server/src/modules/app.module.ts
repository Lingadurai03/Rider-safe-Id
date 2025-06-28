import { Module } from '@nestjs/common';

import { AppController } from '@/controllers';
import { AuthModule, PublicModule } from '@/modules';
import { AppService } from '@/services';

import { ProfileModule } from './profile.module';
import { UploadModule } from './upload.module';

@Module({
    imports: [AuthModule, ProfileModule, PublicModule, UploadModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
