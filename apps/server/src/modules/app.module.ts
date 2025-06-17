import { Module } from '@nestjs/common';

import { AppController } from '@/controllers';
import { AuthModule } from '@/modules';
import { AppService } from '@/services';

import { ProfileModule } from './profile.module';

@Module({
    imports: [AuthModule, ProfileModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
